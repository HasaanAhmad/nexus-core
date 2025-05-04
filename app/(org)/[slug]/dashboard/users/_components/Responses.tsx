'use client'

import React, { useEffect, useState } from 'react'
import { getResponse } from '../actions/getResponse'
import { getAllForms } from '../actions/getAllForms'
import { createEmployee } from '@/actions/UserActions'
import { patchResponseStatus } from '../actions/getResponse'
import { sendAccountDetails } from '../actions/sendMail'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle, Filter, Download, Calendar, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import bcrypt from 'bcryptjs'

interface Response {
  id: number;
  formId: number;
  response: string;
  createdAt?: string;
  status?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

interface Form {
  id: number;
  createdAt: string;
  organizationId: string;
  jsonform: string;
  createdBy: string;
}

interface FormData {
  title: string;
  description?: string;
  fields?: any[];
}

const JsonViewer = ({ data }: { data: any }) => {
  return (
    <pre className="bg-slate-50 p-4 rounded-lg overflow-auto max-h-96 text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

const ResponseModal = ({ response, onStatusChange }: { 
  response: Response, 
  onStatusChange: (id: number, status: 'approved' | 'rejected') => Promise<void> 
}) => {
  const [parsedData, setParsedData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {
    try {
      const parsed = JSON.parse(response.response)
      setParsedData(parsed.responses || parsed)
    } catch (e) {
      setParsedData({ error: "Could not parse response data", raw: response.response })
    }
  }, [response])

  if (!parsedData) return null

  const handleStatusChange = async (status: 'approved' | 'rejected') => {
    setIsLoading(true)
    try {
      await onStatusChange(response.id, status)
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = () => {
    switch (response.status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">Pending Review</Badge>
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Response Details</DialogTitle>
            {getStatusBadge()}
          </div>
          <DialogDescription className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
            <div className="flex items-center gap-1">
              <span className="font-medium">ID:</span> {response.id}
            </div>
            {response.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Submitted: {new Date(response.createdAt).toLocaleString()}</span>
              </div>
            )}
            {response.reviewedAt && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Reviewed:</span> {new Date(response.reviewedAt).toLocaleString()}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="data">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="data">Response Data</TabsTrigger>
              <TabsTrigger value="raw">Raw JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="data" className="pt-4">
              <div className="bg-white rounded-md border p-4">
                {Object.entries(parsedData).map(([key, value]) => (
                  <div key={key} className="py-2 border-b last:border-0">
                    <div className="font-medium text-sm text-slate-500">{key}</div>
                    <div className="mt-1">{String(value)}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="raw" className="pt-4">
              <JsonViewer data={parsedData} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => window.alert("Response data downloaded")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline" 
              className="border-red-200 hover:bg-red-50 hover:text-red-600 text-red-500 flex items-center gap-2"
              onClick={() => handleStatusChange('rejected')}
              disabled={isLoading || response.status === 'rejected'}
            >
              <XCircle className="h-4 w-4" /> Reject
            </Button>
            
            <Button
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={() => handleStatusChange('approved')}
              disabled={isLoading || response.status === 'approved'}
            >
              <CheckCircle className="h-4 w-4" /> Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const StatusBadge = ({ status }: { status?: string }) => {
  switch (status) {
    case 'approved':
      return (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-xs font-medium">Approved</span>
        </div>
      )
    case 'rejected':
      return (
        <div className="flex items-center gap-1 text-red-600">
          <XCircle className="h-4 w-4" />
          <span className="text-xs font-medium">Rejected</span>
        </div>
      )
    default:
      return (
        <div className="flex items-center gap-1 text-slate-500">
          <span className="h-2 w-2 rounded-full bg-slate-300"></span>
          <span className="text-xs">Pending</span>
        </div>
      )
  }
}

const ResponsesTable = ({ 
  responses, 
  formTitle, 
  onStatusChange 
}: { 
  responses: Response[], 
  formTitle: string,
  onStatusChange: (id: number, status: 'approved' | 'rejected') => Promise<void>
}) => {
  const getShortPreview = (response: string) => {
    try {
      const parsed = JSON.parse(response)
      const data = parsed.responses || parsed
      const fields = Object.keys(data).slice(0, 2)
      
      return fields.map(field => {
        const value = data[field]
        const displayValue = typeof value === 'string' 
          ? (value.length > 20 ? value.substring(0, 20) + '...' : value)
          : typeof value
        
        return `${field}: ${displayValue}`
      }).join(', ') + (Object.keys(data).length > 2 ? '...' : '')
    } catch (e) {
      return 'Unable to parse response'
    }
  }

  // Function to handle quick approval/rejection
  const handleQuickAction = async (id: number, status: 'approved' | 'rejected') => {
    const confirmed = window.confirm(`Are you sure you want to ${status === 'approved' ? 'approve' : 'reject'} this response?`)
    if (confirmed) {
      await onStatusChange(id, status)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-slate-500">Showing {responses.length} responses</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[80px]">Form ID</TableHead>
              <TableHead>Response Data</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[180px]">Date</TableHead>
              <TableHead className="w-[150px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.formId} className="hover:bg-slate-50">
                <TableCell className="font-medium">{response.id}</TableCell>
                <TableCell className="font-mono text-xs text-slate-600 truncate max-w-md">
                  {getShortPreview(response.response)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={response.status} />
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {response.createdAt ? new Date(response.createdAt).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <ResponseModal response={response} onStatusChange={onStatusChange} />
                    
                    {!response.status || response.status === 'pending' ? (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleQuickAction(response.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleQuickAction(response.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-2 flex justify-between items-center text-sm text-slate-500">
        <div>
          {responses.filter(r => r.status === 'approved').length} approved · {responses.filter(r => r.status === 'rejected').length} rejected · {responses.filter(r => !r.status || r.status === 'pending').length} pending
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0">
            1
          </Button>
        </div>
      </div>
    </div>
  )
}

const FormCard = ({ form, responses, onStatusChange }: { 
  form: Form, 
  responses: Response[],
  onStatusChange: (id: number, status: 'approved' | 'rejected') => Promise<void>
}) => {
  const [formData, setFormData] = useState<FormData>({ title: "Unknown Form" })
  const [isExpanded, setIsExpanded] = useState(true)
  
  useEffect(() => {
    try {
      const parsed = JSON.parse(form.jsonform)
      setFormData({
        title: parsed.title || "Untitled Form",
        description: parsed.description,
        fields: parsed.fields
      })
    } catch (e) {
      console.error("Error parsing form data", e)
    }
  }, [form])

  // Calculate statistics for the card
  const approvedCount = responses.filter(r => r.status === 'approved').length
  const rejectedCount = responses.filter(r => r.status === 'rejected').length
  const pendingCount = responses.filter(r => !r.status || r.status === 'pending').length

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{formData.title}</CardTitle>
              <Badge variant={responses.length > 0 ? "default" : "outline"} className="ml-2">
                {responses.length} {responses.length === 1 ? 'response' : 'responses'}
              </Badge>
            </div>
            {formData.description && (
              <CardDescription className="mt-1.5 line-clamp-2">{formData.description}</CardDescription>
            )}
            
            {responses.length > 0 && (
              <div className="flex gap-3 mt-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>{approvedCount} approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <span>{rejectedCount} rejected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                  <span>{pendingCount} pending</span>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '-' : '+'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-0 pt-4">
          {responses.length > 0 ? (
            <div className="px-6 pb-6">
              <ResponsesTable 
                responses={responses} 
                formTitle={formData.title} 
                onStatusChange={onStatusChange}
              />
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <p className="mb-3">No responses for this form yet</p>
              <Button variant="outline" size="sm" className="flex mx-auto items-center gap-2">
                <Eye className="h-3.5 w-3.5" /> Preview Form
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-full" />
    </div>
    
    {[1, 2].map(i => (
      <Card key={i}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64 mt-2" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)



const Responses = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(true);
  const [formResponses, setFormResponses] = useState<{form: Form, responses: Response[]}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const updateResponseStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      // First update the status in the database
      await patchResponseStatus(id, status);
      
      // If approved, find the response data and create employee
      if (status === 'approved') {
        // Find the response to get the form data
        const response = formResponses.flatMap(fr => fr.responses).find(r => r.id === id);
        console.log('Response to be processed:', response); // Debug line
        
        if (response) {
          try {
            // Parse the form response JSON to get user data
            const responseData = JSON.parse(response.response);
            
            // Create FormData object from response
            const formData = new FormData();
            formData.append('fullName', responseData.responses.fullName || '');
            formData.append('email', responseData.responses.email || '');
            
            // Generate a temporary password (or use one from the form if it exists)
            // In production, you'd want to generate a secure random password
            const tempPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            
            
            // Create the employee account
            const result = await createEmployee(formData, hashedPassword);
            try{
              const mail = await sendAccountDetails({
                email: responseData.responses.email || '',
                password: tempPassword,
              });
              console.log('Mail sent successfully:', mail);
            }catch (error) {
              console.error('Error sending email:', error);
              throw new Error('Failed to send account details email');
            }
            
            if (!result.success) {
              console.error('Failed to create employee:', result.message);
              throw new Error(result.message);
            }
          } catch (parseError) {
            console.error('Error parsing response data:', parseError);
            throw new Error('Could not parse form response data');
          }
        }
      }
      
      return true;
    }
    catch (error) {
      console.error('Error updating response status:', error);
      throw new Error('Failed to update response status');
    }
  }
  
  // Function to handle status changes
  const handleStatusChange = async (responseId: number, status: 'approved' | 'rejected') => {
    try {
      await updateResponseStatus(responseId, status);
      
      // Update local state to reflect the change
      setFormResponses(prevResponses => 
        prevResponses.map(formResponse => ({
          form: formResponse.form,
          responses: formResponse.responses.map(response => 
            response.id === responseId 
              ? { 
                  ...response, 
                  status, 
                  reviewedAt: new Date().toISOString(),
                  reviewedBy: user?.email || 'Anonymous'
                }
              : response
          )
        }))
      );
    } catch (error) {
      console.error('Error updating response status:', error);
      window.alert('Failed to update response status. Please try again.');
    }
  };
  
  // Function to refresh data
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make sure user data is available
        if (!user?.email) {
          throw new Error('User email not available');
        }

        const forms = await getAllForms(user.email);
        
        // Using Promise.all to fetch all responses in parallel
        const responsesPromises = forms.map(async (form) => {
          const responses = await getResponse(form.id);
          
          // Add mock status for demo (in real app this would come from API)
          const enhancedResponses = responses.map((resp, idx) => {
            return {
              id: resp.id,
              formId: resp.formId,
              response: resp.response,
              status: resp.status || 'pending', // Make sure status is defined
              createdAt: resp.createdAt ? new Date(resp.createdAt).toISOString() : new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            } satisfies Response;
          });
          
          return { form, responses: enhancedResponses };
        });
        
        const responsesData = await Promise.all(responsesPromises);
        setFormResponses(responsesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, refreshKey]);

  // Filter responses based on search query
  const filteredFormResponses = formResponses.map(fr => ({
    form: fr.form,
    responses: fr.responses.filter(r => {
      if (!searchQuery) return true;
      
      try {
        const responseData = JSON.parse(r.response);
        return JSON.stringify(responseData).toLowerCase().includes(searchQuery.toLowerCase());
      } catch {
        return r.response.toLowerCase().includes(searchQuery.toLowerCase());
      }
    })
  }));

  // Calculate totals for the dashboard
  const totalResponses = formResponses.reduce((sum, fr) => sum + fr.responses.length, 0);
  const totalApproved = formResponses.reduce((sum, fr) => 
    sum + fr.responses.filter(r => r.status === 'approved').length, 0);
  const totalRejected = formResponses.reduce((sum, fr) => 
    sum + fr.responses.filter(r => r.status === 'rejected').length, 0);
  const totalPending = totalResponses - totalApproved - totalRejected;

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (formResponses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Form Responses</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-slate-500">
          <p>No forms or responses found</p>
          <Button className="mt-4" variant="outline">Create a Form</Button>
        </CardContent>
      </Card>
    );
  }

  // Group forms by those with responses and those without
  const formsWithResponses = filteredFormResponses.filter(item => item.responses.length > 0);
  const formsWithoutResponses = filteredFormResponses.filter(item => item.responses.length === 0);

  return (
    <div className="space-y-6">
      {/* Dashboard summary cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Responses</p>
                <h3 className="text-2xl font-bold mt-1">{totalResponses}</h3>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <span className="block h-6 w-6 rounded-full bg-blue-600"></span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Approved</p>
                <h3 className="text-2xl font-bold mt-1">{totalApproved}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {totalResponses ? Math.round((totalApproved / totalResponses) * 100) : 0}% of total
                </p>
              </div>
              <div className="bg-green-50 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Rejected</p>
                <h3 className="text-2xl font-bold mt-1">{totalRejected}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {totalResponses ? Math.round((totalRejected / totalResponses) * 100) : 0}% of total
                </p>
              </div>
              <div className="bg-red-50 p-2 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Review</p>
                <h3 className="text-2xl font-bold mt-1">{totalPending}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {totalResponses ? Math.round((totalPending / totalResponses) * 100) : 0}% of total
                </p>
              </div>
              <div className="bg-slate-100 p-2 rounded-full">
                <span className="block h-6 w-6 rounded-full border-2 border-slate-300"></span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rest of the component remains the same */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Form Responses</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and review form submissions
          </p>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search responses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 pr-8 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="with-responses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="with-responses">
            With Responses
            {formsWithResponses.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {formsWithResponses.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="without-responses">
            Without Responses
            {formsWithoutResponses.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {formsWithoutResponses.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="with-responses" className="space-y-4 mt-4">
          {formsWithResponses.length > 0 ? (
            formsWithResponses.map(({ form, responses }) => (
              <FormCard 
                key={form.id} 
                form={form} 
                responses={responses} 
                onStatusChange={handleStatusChange} 
              />
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-slate-500">No forms with responses found</p>
              {searchQuery && (
                <p className="text-sm text-slate-400 mt-2">
                  Try adjusting your search query
                </p>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="without-responses" className="space-y-4 mt-4">
          {formsWithoutResponses.length > 0 ? (
            formsWithoutResponses.map(({ form, responses }) => (
              <FormCard 
                key={form.id} 
                form={form} 
                responses={responses} 
                onStatusChange={handleStatusChange} 
              />
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-slate-500">No forms without responses found</p>
              {searchQuery && (
                <p className="text-sm text-slate-400 mt-2">
                  Try adjusting your search query
                </p>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Responses;