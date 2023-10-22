"use client"
import { AuthContext } from '@/context/AuthProvider';
import { createSale, searchMed } from '@/utils/services/MedServces';
import { CheckIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Input, Select, Option, Button, IconButton, Alert, Progress } from '@material-tailwind/react'
import React, { useContext } from 'react'

export default function CreateSale() {
    const {user} = useContext(AuthContext);
    const [status, setStatus] = React.useState(null);
    const [payment, setPayment] = React.useState(null);
    const [quantity, setQuantity] = React.useState(null);
    const [total, setTotal] = React.useState(null);
    const [items, setItems] = React.useState([])
    const [item, setItem] = React.useState(null)
    const [search, setSearch] = React.useState('')
    const [error, setError] = React.useState(null)
    const [error1, setError1] = React.useState(null)
    const [count, setCount] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(null)

    const searchmed = async (newSearch) => {
        await searchMed(newSearch).then((res)=>{
            if(res.success){
                if(res.data.length === 0){
                    setError1('No medicine found')
                    setTimeout(() => {
                        setError1(null);
                    }, 3000);
                    return
                }else{
                    setItem(res.data)
                }
                
            }else{
                setError1(res.data)
                setTimeout(() => {
                    setError1(null);
                }, 3000);
            }
        })
    }

    const addItems = (data) => {
        const newItem = {
            id: data.id,
            name: data.name,
            quantity: quantity,
            total: total
        }
        setItems([...items, newItem])
        setItem(null)
        setSearch('')
        setQuantity(null)
        setTotal(null)
    }

    const removeItem = (id) => {
        const newItems = items.filter((item)=>item.id !== id)
        setItems(newItems)
    }


    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target);
        setCount(25)
        const data = {
            customer_name: formData.get('customer_name'),
            status: status,
            payment: payment,
            items: items
        }
        setTimeout(() => {
            setCount(50)
        }, 1000);

        await createSale(data).then((res)=>{
            if(res.success){
                setCount(100)
                setSuccess(res.data)
                setTimeout(() => {
                    setSuccess(null);
                    setItems([])
                    setCount(0)
                }, 3000);
                setLoading(false)
                
            }else{
                setLoading(false)
                setCount(0)
                setError(res.data)
                setTimeout(() => {
                    setError(null);
                }, 3000);
                
                
            }
        }).catch((err)=>{
            setLoading(false)
            setCount(0)
            setError(err['message'])
            setTimeout(() => {
                setError(null);
            }, 3000);
        })
    }

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
                <p className='text-gray-800 mt-2 pl-5'>Add sales in your inventory</p>
            </div>
        </div>

        <div className='bg-white p-5 w-full mt-10 mb-2 rounded-md flex flex-col'>
            <form onSubmit={(e)=>submit(e)}>
            {loading &&<Progress className='mb-5' color='teal' value={count} size="lg" label="Large" />}
            {success && (<Alert color="green" className='mb-5 text-center'> {success} </Alert>)}
            {error && (<Alert color="red" className='mb-5 text-center'> {error} </Alert>)}
            <div className='flex space-x-5 w-full'>
                <Input type="text" name='customer_name' color="lightBlue" size="lg" placeholder="Customer Name"/>
                <Select name='status' color="lightBlue" size="lg" value={status} onChange={(e)=>setStatus(e)} label='Select Status'>
                    <Option value="Pending">Pending</Option>
                    <Option value="Processing">Processing</Option>
                    <Option value="Completed">Completed</Option>
                </Select>
                <Select name='payment' color="lightBlue" size="lg" label='Payment Type' onChange={(e)=>setPayment(e)}>
                    <Option value="CreditCard">CreditCard</Option>
                    <Option value="MobileMoney">MobileMoney</Option>
                    <Option value="Paypal">Paypal</Option>
                    <Option value="Physical">Physical</Option>
                </Select>
            </div>
            
            <h1 className='font-semibold text-xl mt-5'>Add Medicine</h1>
            <div className='mt-3 flex space-x-5'>
                <Input type="text" name='search' size="regular" onChange={(e)=>setSearch(e.target.value)} label="search meds"/>
                <Button type='button' className='w-[300px]' size="regular" onClick={()=>searchmed(search)}>Search</Button>
            </div>
            {error1 && (<Alert color="red" className='mt-3 text-center'> {error1} </Alert>)}
            {item && (
                <div className='mt-3 flex space-x-5'>
                    <Input type="text" color="lightBlue" size="lg" value={item.name} placeholder="Medicine Name" disabled/>
                    <Input type="number" name='quantity' size="lg" onChange={(e)=>setQuantity(e.target.value)} placeholder="Quantity"/>
                    <Input type="number" name='total' size="lg" onChange={(e)=>setTotal(e.target.value)} placeholder="Total Price"/>
                    <IconButton className='p-5' color="green" size="regular" ripple="light" onClick={()=>addItems(item)}>
                        <CheckIcon className='h-6 w-6' />
                    </IconButton>
                </div>
            )}
            <div className='mt-5 mb-5 border-2 border-gray-400 w-full'/>

            {items.map((data, index)=>(
                <div key={index} className='mt-3 flex space-x-5'>
                    <Input type="text" color="lightBlue" size="lg" value={data.name} label="Medicine Name" disabled/>
                    <Input type="number" name='quantity' size="lg" label="Quantity" value={data.quantity} disabled/>
                    <Input type="number" name='total' size="lg" placeholder="Total Price" value={data.total} disabled/>
                    <IconButton className='p-5' color="red" size="regular" ripple="light" onClick={()=>removeItem(data.id)}>
                        <XMarkIcon className='h-6 w-6' />
                    </IconButton>
                </div>
            ))}

            <Button type='submit' className='w-[300px] mt-5' color="teal" size="regular">Add Sale</Button>
            </form>
        </div>
    </div>
  )
}
