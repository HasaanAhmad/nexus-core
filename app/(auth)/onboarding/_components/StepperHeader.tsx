import React from 'react'
import Image from "next/image"
import Logo from "@/public/assests/logo.png"
import Link from 'next/link'

type Props = {}

const StepperHeader = (props: Props) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-20 bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
      <Link href={"/"}>
      <Image src={Logo} alt="Logo" className="cursor-pointer w-64 h-auto"/>
      </Link>
      </header>
  )
}

export default StepperHeader