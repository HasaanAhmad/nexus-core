import React from 'react'
import AdminSideAttendance from './[components]/AdminSideAttendance'


const page = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
        <div className="flex flex-col gap-4 w-full h-full p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Attendance Management</h1>
            <p className="text-sm ">Manage attendance records for your organization.</p>
            <AdminSideAttendance />
        </div>
    </div>    
)
}

export default page