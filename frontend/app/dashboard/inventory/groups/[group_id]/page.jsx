"use client"
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Button } from '@material-tailwind/react'
import React, {useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthProvider'
import { getGroup } from '@/utils/services/MedServces'
import DeleteCard from '@/components/DeleteCard'
import { GroupURL } from '@/utils/API_Routers'


export default function GroupDetail({params}) {
    const router = useRouter()
    const {user} = useContext(AuthContext)
    const [groupDetail, setGroupDetail] = useState({id: 0, name: '', description: '', meds: []})
    const [open, setOpen] = useState(false)
    const handler = () => setOpen((prev)=>!prev)

    useEffect(()=>{
        getGroup(user.token, params.group_id).then((res)=>{
            setGroupDetail(res)
        })
    },[])
    
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
                <h1 onClick={()=>router.back()} className='text-3xl font-semibold text-gray-400'>
                    List of Medicine Groups
                </h1>
                <h1 className='text-3xl font-semibold text-gray-900'>
                    {groupDetail.name}
                </h1>
            </Breadcrumbs>
                <p className='text-gray-800 mt-2 pl-5'>List of medicines available for sales.</p>
            </div>
        </div>
        
        <div className='flex gap-5 mt-10 mb-2'>
            <div className='bg-white p-5 w-2/6 rounded-md flex flex-col'>
                <h1 className='text-lg font-bold text-gray-900'>Group ID:</h1>
                <h1 className='text-2xl text-gray-900 mb-2'>AD{groupDetail.id}YQX</h1>

                <h1 className='text-lg font-bold text-gray-900'>Group Name</h1>
                <h1 className='text-2xl text-gray-900 mb-2'>{groupDetail.name}</h1>

                <h1 className='text-lg font-bold text-gray-900'>Group Description</h1>
                <h1 className='text-2xl text-gray-900 mb-5'>{groupDetail.description}</h1>
                <div className='flex justify-end mt-5'>
                    <Button onClick={()=>handler()} className='h-12' color='red' fullWidth>Delete</Button>
                </div>
            </div>
            <div className='bg-white p-5 w-4/5 rounded-md'>
            <table className='w-full table overflow-x-auto lg:overflow-x-none'>
                <thead className='border-b-2 border-gray-200'>
                    <tr>
                        <th className='text-left text-gray-600 font-semibold'>Medicine ID</th>
                        <th className='text-left text-gray-600 font-semibold'>Medicine Name</th>
                        <th className='text-left text-gray-600 font-semibold'>No. of Stocks</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {groupDetail.meds?.map(({id, name, med_id, quantity})=>(
                        <tr key={id} className='hover:bg-gray-100'>
                            <td className='py-3'>{med_id}</td>
                            <td className='py-3'>{name}</td>
                            <td className='py-3'>{quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        <DeleteCard open={open} handler={handler} api={GroupURL+"/"} id={groupDetail.id} title={groupDetail.name} cardName='Group'/>
    </div>
  )
}
