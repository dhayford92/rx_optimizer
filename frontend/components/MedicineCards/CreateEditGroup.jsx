"use client"
import {useContext, useState} from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {Button, Dialog, Card, CardBody, CardFooter, Typography, Input, IconButton, Spinner, Alert, Textarea} from "@material-tailwind/react";
import { createGroup, editGroup } from '@/utils/services/MedServces';
import { AuthContext } from '@/context/AuthProvider';




// Group Create
export function GroupCreate({open, handler}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const {user} = useContext(AuthContext);


    const submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        setLoading(true)
        const body = {
            name: data.get('name'),
            description: data.get('description')
        }
        await createGroup(body, user.token).then(res => {
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
            setError(err)
            setTimeout(() => {
                setError(null);
                }, 3000);
        });
        
    }

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
                                Add New Group
                            </Typography>
                            <span className='font-meduim text-sm'>Please provide details of the new group in this form.</span>
                        </div>
                        <Input type='text' label='Group Name' name="name" placeholder="name" size="lg" required disabled={loading} />
                        <Textarea 
                            type='text'
                            rows='3'
                            resize='none'
                            label='Description'
                            name="description" placeholder="description" size="lg" required disabled={loading} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Spinner color="teal" size="lg" className="ml-2 self-center" /> :
                        <Button variant="gradient" color='teal' type='submit' fullWidth>
                            Create New Group
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



// User Edit
export function GroupEdit({open, handler, groupDetails}) {
    const {id, name, description} = groupDetails || {id:0, name: '', description: ''}
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        setLoading(true)
        const body = {
            name: data.get('name') || name,
            description: data.get('description') || description
        }
        await editGroup(user.token, body, id).then(res => {
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
                                Edit Group
                            </Typography>
                            <span className='font-meduim text-sm'>Please provide details of the group in this form.</span>
                        </div>
                        <Input type='text' name="name" defaultValue={name} placeholder={name} size="lg" disabled={loading} />
                        <Textarea 
                            type='text'
                            rows='3'
                            resize='none'
                            defaultValue={description}
                            name="description" placeholder={description} size="lg" disabled={loading} />
                        
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Spinner color="teal" size="lg" className="ml-2 self-center" />:
                        <Button variant="gradient" color='teal' type='submit' fullWidth>
                            Update Group
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
