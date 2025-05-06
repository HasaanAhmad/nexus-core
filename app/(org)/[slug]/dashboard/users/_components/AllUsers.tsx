'use client'
import React, { useEffect, useState } from 'react'
import { useOrganizationStore } from '@/store/organizationStore'
import { getAllUsers } from '../actions/getAllUsers'
import loading from '@/app/(auth)/onboarding/loading';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader, Pencil, Trash2, MoreHorizontal, MoreVertical, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

const AllUsers = () => {
    const { organization } = useOrganizationStore();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const id = organization?.id;

    useEffect(() => {
        // Only fetch if we have an organization ID
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const users = await getAllUsers(id);
                setUsers(users.map(user => ({
                    ...user,
                    organizationId: user.organizationId ?? undefined
                })));
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [id]);

    if (!id) return null;

    return (
        <Card className="w-full">
            <CardHeader>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center p-4">
                        <Loader className="h-6 w-6 animate-spin" />
                    </div>
                ) : (
                    <div className="rounded-md border">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 bg-gray-50 border-b">
                            <div className="p-4 font-medium">User Email</div>
                            <div className="p-4 font-medium">User Type</div>
                            <div className="p-4 font-medium">Role</div>
                            <div className="p-4 font-medium">Actions</div>
                        </div>

                        {/* Table Body */}
                        {users.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No users found
                            </div>
                        ) : (
                            users.map((user) => (
                                <div key={user.id} className="grid grid-cols-4 border-b last:border-0">
                                    <div className="p-4">{user.email}</div>
                                    <div className="p-4">
                                        <Badge variant={user.userType === 'ADMIN' ? 'default' : 'secondary'}>
                                            {user.userType}
                                        </Badge>
                                    </div>
                                    <div className="p-4">
                                        <Badge variant="destructive">
                                            Role Not Assigned
                                        </Badge>
                                    </div>

                                    <div className="p-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="px-2">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44 bg-white p-0 border shadow-md rounded-lg overflow-hidden">
                                                <div className="px-3 py-2 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</div>
                                                <div className="p-2 space-y-1">
                                                    <Button variant="ghost" size="sm" className="w-full justify-start text-left font-normal text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <UserCog className="mr-2 h-4 w-4" />
                                                        Modify Role
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="w-full justify-start text-left font-normal text-red-600 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete User
                                                    </Button>
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                            ))
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AllUsers