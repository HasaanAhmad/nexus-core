'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, Copy, Share2 } from "lucide-react"
import { sendFormInvite } from '../../actions/sendMail'
import { saveInvitation } from '../../actions/saveInvitation'

type ShareModalProps = {
  isOpen: boolean
  onClose: () => void
  formUrl: string
  formId?: number
}

const ShareModal = ({ isOpen, onClose, formUrl, formId }: ShareModalProps) => {
  const [email, setEmail] = useState('')
  // An invitational message to user asking him to register himself on the form
  const [message, setMessage] = useState(`I'd like to share this form with you`)
  const [isSending, setIsSending] = useState(false)

  const handleSendInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    if (!formId) {
      toast.error("Form ID is missing");
      return;
    }

    try {
      setIsSending(true);
      
      // Call the server action to send the email
      const result = await sendFormInvite({ 
        email, 
        message, 
        formUrl,
        formId 
      });
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send invitation');
      }
      
      // Only try to save invitation after we know the email was sent successfully
      let invitationSaved = false;
      try {
        await saveInvitation(formId, email);
        invitationSaved = true;
      }
      catch (error) {
        console.error("Error saving invitation:", error);
        // Don't show toast here - we'll handle in the final success message
      }
      
      // Show a success message that includes invitation status
      if (invitationSaved) {
        toast.success(`Form link sent to ${email}`);
      } else {
        toast.success(`Form link sent to ${email}, but there was an issue saving the invitation record`);
      }
      
      setEmail('');
      setMessage(`I'd like to share this form with you`);
      onClose();
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send the invitation. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    toast.success("Form link copied to clipboard");
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Form</DialogTitle>
          <DialogDescription>
            Send the form link to recipients via email
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">Form Link</Label>
              <Input
                id="link"
                readOnly
                value={formUrl}
              />
            </div>
            <Button size="sm" variant="outline" onClick={copyLinkToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="recipient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal note"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendInvite} 
            disabled={isSending}
            className="gap-2"
          >
            {isSending ? (
              <>Sending...</>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal