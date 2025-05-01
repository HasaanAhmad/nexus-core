'use client'
import React from 'react'
import { ChartAreaIcon, LibraryBig, Shield } from 'lucide-react';
import { MessageCircleReply } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';


const Sidenav = () => {
    const path = usePathname();
    const menuList = [
        {
            id: 1,
            name: "MyForms",
            icon: LibraryBig,
            path:"/dashboard"
        },
        {
            id: 2,
            name: "Responses",
            icon: MessageCircleReply,
            path:"/dashboard/responses"
        },
        {
            id: 3,
            name:"Analytics",
            icon: ChartAreaIcon,
            path:"/dashboard/analytics"
        },
        {
            id: 4,
            name: "Upgrade",
            icon: Shield,
            path:"/dashboard/upgrade"
        }
    ]
  return (
    <div className='h-screen shadow-md border'>
        <div className="p-5">
            {menuList.map((menu,index) =>(
                <h2 key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-yellow-400 hover:text-white rounded-lg cursor-pointer text-gray-600 ${path == menu.path && `bg-yellow-400 text-white`}`}>
                    <menu.icon/>
                    {menu.name}
                </h2>
            ))}
        </div>

        <div className='fixed bottom-1 p-6 w-64'>
            <Button className='w-full'>+ Create Form</Button>
            <div className='my-7'>
                <Progress value={66} />
                <h2 className='text-sm mt-2 text-gray-600'><strong>2</strong> Out of 3 Froms Created</h2>
                <h2 className='text-sm mt-2 text-gray-600'>Upgrade your plan for unlimited forms</h2>
            </div>
        </div>
    </div>
  )
}

export default Sidenav