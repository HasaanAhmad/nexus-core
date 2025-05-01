'use client'
import React from 'react'
import Formui from '../_components/Formui'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { SessionProvider } from 'next-auth/react'


const page = () => {
  return (
    <div> 
      <DndProvider backend={HTML5Backend}>
        <SessionProvider>

        <Formui />
        </SessionProvider>
      </DndProvider>
    </div>
  )
}

export default page