"use client"
import React from 'react'
import Image from 'next/image';
import {List} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon, ClipboardDocumentCheckIcon
  } from "@heroicons/react/24/solid";
import SideBarItem, { SelectSideItem } from '@/components/SideBarItem';

 const SideBar = () => {
  return (
    <>
        <div className="fixed z-30 h-screen flex flex-col w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 bg-secondary">
            <div className='w-full bg-dark-secondary h-[80px] flex flex-row items-center justify-center'>
                <Image src='/images/logo.svg' width={50} height={50} alt='logo' className='m-auto'/>
                <Image src='/images/textlogo.svg' width={250} height={50} alt='logo' className='m-auto'/>
            </div>

            {/* sidebar items */}
            <List className='mt-5'>
                <SideBarItem 
                    path='/dashboard'
                    text='Dashboard' 
                    icon={<PresentationChartBarIcon className="h-5 w-5"/>}
                href='/dashboard'/>
                <SideBarItem 
                    path='/dashboard/users'
                    text='All Users' 
                    icon={<UserCircleIcon className="h-5 w-5"/>}
                href='/dashboard/users'/>
                
                <SelectSideItem 
                    path='/dashboard/inventory'
                    text='Inventory'
                    icon={<ShoppingBagIcon className="h-5 w-5"/>}
                    listSide={[
                        {
                            path: '/dashboard/inventory',
                            text: 'List Of Meds',
                            href: '/dashboard/inventory'
                        },
                        {
                            path: '/dashboard/inventory/groups',
                            text: 'Meds Groups',
                            href: '/dashboard/inventory/groups'
                        },
                    ]}/>

                <SelectSideItem 
                    path='/dashboard/sales'
                    text='Sales'
                    icon={<ClipboardDocumentCheckIcon className="h-5 w-5"/>}
                    listSide={[
                        {
                            path: '/dashboard/sales',
                            text: 'Create Sale',
                            href: '/dashboard/sales'
                        },
                        {
                            path: '/dashboard/sales/all',
                            text: 'All Sales',
                            href: '/dashboard/sales/all'
                        },
                    ]}/>
                 
            </List>

            {/* footer */}
            <div className='absolute w-full bg-dark-secondary h-[40px] p-2 items-center bottom-0'>
                <span className='text-sm font-medium text-gray-300 text-center ml-4'>© 2023 All Rights Reserved</span>
            </div>
        </div>
    </>
  )
}



export default SideBar