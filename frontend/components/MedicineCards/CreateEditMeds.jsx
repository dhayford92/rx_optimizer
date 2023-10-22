"use client"
import {useState, useEffect, useContext} from 'react'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, IconButton, Spinner, Alert, Select, Option, Textarea} from "@material-tailwind/react";
import { AuthContext } from '@/context/AuthProvider';
import { createMed, editMed, getAllGroups } from '@/utils/services/MedServces';



 // Meds Create
export function MedsCreate({open, handler}) {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState(null);

    const submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        setLoading(true)
        const body = {
            name: data.get('name'),
            quantity: data.get('quantity'),
            group: group,
            how_to_use: data.get('how_to_use'),
            side_effect: data.get('side_effect'),
        }
        await createMed(body, user.token).then(res => {
            setLoading(false)
            if(res.success){
                setSuccess(res.data)
                setTimeout(() => {
                    setSuccess(null)
                    handler();
                    }, 3000);
            }else{
                setError(res.data)
                setTimeout(() => {
                    setError(null);
                    }, 3000);
            }
        }).catch((err) => {
            setLoading(false)
            setError(err['message'])
            setTimeout(() => {
                setError(null);
                }, 3000);
        });
    }

    useEffect(()=>{
        getAllGroups(user.token).then((res)=> {
            setGroups(res)
        })
    },[])

  return (
    <>
        <Dialog size="md" open={open} handler={handler} className="bg-transparent shadow-none">
            <form onSubmit={(e)=>submit(e)}>
                <Card className="mx-auto w-full max-w-[480px]">
                    <CardBody className="flex flex-col gap-4">
                        <IconButton onClick={handler} variant="text" className='self-end'>
                            <XMarkIcon className='h-6 w-6'/>
                        </IconButton>
                        <div>
                            <Typography variant='h4'>
                                Create New Medicine
                            </Typography>
                            <span className='font-meduim text-sm'>Please provide details of the new medicine in this form.</span>
                        </div>
                        <Input type='text' name="name" placeholder="fullname" size="lg" required disabled={loading}/>
                        <Input type='number' name="quantity" placeholder="Quantity" size="lg" required disabled={loading}/>
                        <Select size="lg" name='group' label='Choose a Group' placeholder="Choose a Group" required disabled={loading} 
                            onChange={(e)=>setGroup(e)} value={group}>
                            {groups.map(({id, name})=>(
                                <Option key={id} value={id}>{name}</Option>
                            ))}
                        </Select>
                        <Textarea name='how_to_use' placeholder='How to use' size='regular' required disabled={loading}/>
                        <Textarea name='side_effect' placeholder='Side effect' size='regular' required disabled={loading}/>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Spinner color="teal" size="lg" className="ml-2 self-center" />:
                        <Button variant="gradient" color='teal' type='submit' fullWidth>
                            Add New Medicine
                        </Button>}
                        {error && <Alert color="red" className="mt-3 w-full" icon> {error} </Alert>}
                        {success && <Alert color="green" className="mt-3 w-full" icon> {success} </Alert>}
                    </CardFooter>
                </Card>
            </form>
        </Dialog>
    </>
  )
}



// Meds Edit

export function MedsEdit({open, handler, oldData}) {
    const {user} = useContext(AuthContext);
    const {id, name, quantity, group, how_to_use, side_effect} = oldData || {}
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [newGroup, setGroup] = useState(null)
    const [groups, setGroups] = useState([])

    const submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        setLoading(true)
        const body = {
            name: data.get('name') || name,
            quantity: data.get('quantity') || quantity,
            group: newGroup,
            how_to_use: data.get('how_to_use') || how_to_use,
            side_effect: data.get('side_effect') || side_effect,
        }
        await editMed(body, user.token, id).then(res => {
            setLoading(false)
            if(res.success){
                setSuccess(res.data)
                setTimeout(() => {
                    setSuccess(null)
                    handler();
                    }, 3000);
            }else{
                setError(res.data)
                setTimeout(() => {
                    setError(null);
                    }, 3000);
            }
        }).catch((err) => {
            setLoading(false)
            setError(err['message'])
            setTimeout(() => {
                setError(null);
            }, 3000);
        });
    }

    useEffect(()=>{
        getAllGroups(user.token).then((res)=> {
            setGroups(res)
            for(let g of res){
                if(g.name === group){
                    setGroup(g.id)
                    
                }
            }
        })
        
    },[open==true])

  return (
    <>
        <Dialog size="md" open={open} handler={handler} className="bg-transparent shadow-none">
            <form onSubmit={(e)=>submit(e)}>
                <Card className="mx-auto w-full max-w-[480px]">
                    <CardBody className="flex flex-col gap-4">
                        <IconButton onClick={handler} variant="text" className='self-end'>
                            <XMarkIcon className='h-6 w-6'/>
                        </IconButton>
                        <div>
                            <Typography variant='h4'>
                                Create New Medicine
                            </Typography>
                            <span className='font-meduim text-sm'>Please provide details of the new medicine in this form.</span>
                        </div>
                        <Input type='text' name="name" placeholder={name} defaultValue={name} size="lg" required disabled={loading}/>
                        <Input type='number' name="quantity" placeholder={quantity} defaultValue={quantity} size="lg" required disabled={loading}/>
                        <Select size="lg" name='group' label='Choose a Group' placeholder="Choose a Group" required disabled={loading} 
                            onChange={(e)=>setGroup(e)} value={newGroup}>
                            {groups.map(({id, name})=>(
                                <Option key={id} value={id}>{name}</Option>
                            ))}
                        </Select>
                        <Textarea name='how_to_use' placeholder={how_to_use} defaultValue={how_to_use} size='regular' required disabled={loading}/>
                        <Textarea name='side_effect' placeholder={side_effect} defaultValue={side_effect} size='regular' required disabled={loading}/>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Spinner color="teal" size="lg" className="ml-2 self-center" />:
                        <Button variant="gradient" color='teal' type='submit' fullWidth>
                            Add New Medicine
                        </Button>}
                        {error && <Alert color="red" className="mt-3 w-full" icon> {error} </Alert>}
                        {success && <Alert color="green" className="mt-3 w-full" icon> {success} </Alert>}
                    </CardFooter>
                </Card>
            </form>
        </Dialog>
    </>
  )
}