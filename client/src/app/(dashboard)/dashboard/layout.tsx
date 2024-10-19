import React from 'react'
import SideBar from '@/components/shared/dashboard/sideBar'
import Navbar from '@/components/shared/dashboard/navbar'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Admin Panel',
}

const Layout = ({children}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex'>
            <div className={'flex-[1] bg-bgSoft p-5'}>
                <SideBar/>
            </div>
            <div className={'flex-[4] p-5'}>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

export default Layout
