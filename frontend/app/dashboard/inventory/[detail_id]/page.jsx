"use client"
import { DashCard2 } from '@/components/DashCard';
import { TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {Breadcrumbs ,  Button} from "@material-tailwind/react";
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import DeleteCard from '@/components/DeleteCard';
import { AuthContext } from '@/context/AuthProvider';
import { getMed } from '@/utils/services/MedServces';
import { MedicineURL } from '@/utils/API_Routers';

export default function DetailPage({params}) {
    const {user} = useContext(AuthContext);
    const [med, setMed] = useState({id: '', name: '', med_id: '', group: '', quantity: '', how_to_use: '', side_effect: ''})
    const [open, setOpen] = useState(false);
    const handler = () => setOpen((prev) => !prev);

    useEffect(() => {
        getMed(user.token, params.detail_id).then((res) => {
            setMed(res.data)
        })
    }, [])


  return (
    <div className='pl-60 pr-5 ml-20 pt-10'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-2'>
            <Breadcrumbs fullWidth
            separator={
                <ChevronRightIcon className="h-6 w-6 text-gray-500" strokeWidth={2.5} />
              }>
                <h1 className='text-3xl font-semibold text-gray-400'>
                    Inventory
                </h1>
                <Link href='/dashboard/sales' className='text-3xl font-semibold text-gray-400 hover:underline'>
                    List of Medicines (298)
                </Link>
                <h1 className='text-3xl font-semibold text-gray-900'>
                    {med.name}({params.detail_id})
                </h1>
            </Breadcrumbs>
                <p className='text-gray-800 mt-2 pl-5'>List of medicines available for sales.</p>
            </div>
            <Button onClick={()=>{
                handler();
            }} color='red' className='flex flex-row items-center justify-center'>
                <TrashIcon className='w-5 h-5 mr-2'/>
                Delete
            </Button>
        </div>
        
        <div className='flex justify-between items-center gap-5'>
            <div className='bg-white w-full mt-8 rounded-md'>
              <DashCard2 
              title='Medicine' 
              value1={med.med_id} 
              subtitle1='Medicine ID' 
              value2={med.group} subtitle2='Medicine Group'/>
            </div>
            <div className='bg-white w-full mt-8 rounded-md'>
              <DashCard2 
              title='Inventory in Qty' 
              spanTitle='Send Stock Request'
              value1='234' 
              subtitle1='Lifetime Supply' 
              value2='23' subtitle2='Lifetime Sales'
              value3={med.quantity} subtitle3='Stock Left'/>
            </div>
        </div>
        
        <div className='bg-white w-full mt-8 rounded-md'>
            <DashCard2 
                title='How to use' 
                subtitle1={med.how_to_use}/>
        </div>
        <div className='bg-white w-full mt-8 rounded-md'>
            <DashCard2 
                title='Side Effects' 
                subtitle1={med.side_effect}/>
        </div>
        <DeleteCard open={open} handler={handler} title={med.name} id={params.detail_id} api={MedicineURL} cardName='Medicine'/>
    </div>
  )
}
