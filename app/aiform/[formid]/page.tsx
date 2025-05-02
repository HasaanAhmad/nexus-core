import React from 'react';
import FORMUI from '../[components]/formUI';


const page = async ({
    params,
}: {
    params: Promise<{ formid: string }>
}) => {
    const { formid } = await params
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <h1 className="text-2xl font-bold mb-5 text-gray-800">Form Builder</h1>
            <FORMUI
                params={{
                    formid: formid,
                }}
            />
        </div>
    );
};

export default page;
