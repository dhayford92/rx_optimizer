import DashCard, { DashCard2 } from '@/components/DashCard'
import Image from 'next/image'
import React from 'react'



export default function Dashboard() {
  return (
    <div className='pl-60 pr-5 ml-20 pt-10'>
      <h1 className='text-3xl font-semibold text-gray-900'>Dashboard</h1>
      <p className='text-gray-800 mt-2'>A quick data overview of the inventory.</p>
      
      <div className='grid grid-cols-4 gap-5 mt-10'>
        <DashCard color='green' title='Good' description='Inventory Status' icon='/icons/health.svg'/>
        <DashCard color='yellow' title='Ghc 12378.00' description='Revenue' icon='/icons/payments.svg' />
        <DashCard color='blue' title='223' description='Medicines Available' icon='/icons/medical.svg' />
        <DashCard color='red' title='12' description='Medicines Storage' icon='/icons/warning.svg' />
      </div>

      <div className='bg-white p-5 w-full mt-10 mb-2'>
        <div className='grid grid-cols-2 gap-5 mt-10'>
          <DashCard2 title='Revenue' value1='2390' value2='238' subtitle1='Total no of Medicines' subtitle2='Medicine Groups'/>
          <DashCard2 title='Quick Report' value1='36' value2='123' subtitle1='Qty of Medicines Sold' subtitle2='Invoices Generated'/>
          <DashCard2 title='My Pharmacy' value1='389' value2='234' subtitle1='Total no of Suppliers' subtitle2='Total no of users'/>
          <DashCard2 title='Customers' value1='13' value2='67' subtitle1='Total no of Customers' subtitle2='Frequently bought Item'/>
        </div>
      </div>
      
    </div>
  )
}
