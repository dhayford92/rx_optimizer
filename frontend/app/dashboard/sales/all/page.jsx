"use client"
import DeleteCard from '@/components/DeleteCard'
import { SalesURL } from '@/utils/API_Routers'
import { getSales } from '@/utils/services/MedServces'
import { ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Chip, IconButton } from '@material-tailwind/react'
import React,{useState, useEffect} from 'react'

export default function All() {
    const [open, setOpen] = useState(false)
    const handler = () => setOpen((prev)=>!prev)
    const [sales, setSales] = React.useState([])
    const [sale, setSale] = React.useState({id: null, order_id: null})


    useEffect(() => {
        getSales().then((res)=>{
            if(res.success){
                setSales(res.data)
            }
        })
    }, [open === false])

  return (
    <div className='pl-60 pr-5 ml-20 pt-10'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-2'>
            <Breadcrumbs fullWidth
            separator={
                <ChevronRightIcon className="h-6 w-6 text-gray-500" strokeWidth={2.5} />
              }>
                <h1 className='text-3xl font-semibold text-gray-400'>
                    Sales
                </h1>
                <h1 className='text-3xl font-semibold text-gray-900'>
                    Add New Sale
                </h1>
            </Breadcrumbs>
                <p className='text-gray-800 mt-2 pl-5'>List of all sales in your inventory</p>
            </div>
        </div>

        <div className='bg-white p-5 w-full mt-10 mb-2 rounded-md flex flex-col'>
        <table className='w-full table overflow-x-auto lg:overflow-x-none'>
                <thead className='border-b-2 border-gray-200'>
                    <tr>
                        <th className='text-left text-gray-600 font-semibold'>Order ID</th>
                        <th className='text-left text-gray-600 font-semibold'>Customer Name</th>
                        <th className='text-left text-gray-600 font-semibold'>No. of Meds</th>
                        <th className='text-left text-gray-600 font-semibold'>Status</th>
                        <th className='text-left text-gray-600 font-semibold'>Total</th>
                        <th className='text-left text-gray-600 font-semibold'>Payment</th>
                        <th className='text-left text-gray-600 font-semibold'></th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {sales?.map(({id, order_id, customer_name, items, status, total, payment})=>(
                        <tr key={id} className='hover:bg-gray-100'>
                            <td className='py-3'>{order_id}</td>
                            <td className='py-3'>{customer_name}</td>
                            <td className='py-3'>{items}</td>
                            <td className='py-3'>
                                <Chip value={status}
                                className='p-2 text-center mr-2' color={status === 'Pending' ? 'teal' :status === 'Processing'? 'gray': 'green'} 
                                size='regular'/>
                            </td>
                            <td className='py-3'>{total}</td>
                            <td className='py-3'>{payment}</td>
                            <td className='py-3'>
                                <IconButton onClick={()=>{
                                    setSale({id,  order_id})
                                    handler()}} color='red' ripple='light'>
                                    <TrashIcon className='h-5 w-5' />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <DeleteCard open={open} handler={handler} cardName='Sale' api={SalesURL} title={sale.order_id} id={sale.id} />
    </div>
  )
}
