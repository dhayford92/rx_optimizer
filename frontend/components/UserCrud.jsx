"use client"
import {useContext, useState} from 'react'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
    Button, Dialog, Card, CardBody, CardFooter, Typography, Input, IconButton, Spinner, Alert,
    Select, Option
 } from "@material-tailwind/react";
import { createUser, editUser, deleteUser } from '@/utils/services/UserServices';
import { AuthContext } from '@/context/AuthProvider';




// User Create
export default function UserCreate({open, handler}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [role, setRole] = useState('Staff')

    const submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        if(data.get('password').length < 2){
            setError('Password must be at least 6 characters')
            setTimeout(() => {
                setError(null);
              }, 3000);
            return
        }else{
            setLoading(true)
            const body = {
                fullname: data.get('fullname'),
                email: data.get('email'),
                password: data.get('password'),
                role: role
            }
            await createUser(body).then(res => {
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
                                Create New User
                            </Typography>
                            <span className='font-meduim text-sm'>Please provide details of the new user in this form.</span>
                        </div>
                        <Input type='text' name="fullname" placeholder="fullname" size="lg" required disabled={loading} />
                        <Input type='email' name="email" placeholder="Email Address" size="lg" required disabled={loading}/>
                        <Input type='password' name="password" placeholder="Password" size="lg" required disabled={loading}/>
                        <Select name='role' size="lg" label='Select Role' placeholder="Select Role" required disabled={loading} onChange={(e)=>setRole(e)} value={role}>
                            <Option value="Super Admin">Super Admin</Option>
                            <Option value="Staff">Staff</Option>
                        </Select>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Spinner color="teal" size="lg" className="ml-2 self-center" /> :
                        <Button variant="gradient" color='teal' type='submit' fullWidth>
                            Create New User
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
export function UserEdit({open, handler, userDetail}) {
    const {fullname, email, role, id} = userDetail || {fullname: '', email: '', role: '', id:0}
    const {user} = useContext(AuthContext);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [newrole, setRole] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        setLoading(true)
        const body = {
            fullname: data.get('fullname') || fullname,
            role: newrole || role
        }
        await editUser(user.token, body, id).then(res => {
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
                                Edit User
                            </Typography>
                            <span className='font-meduim text-sm'>Please provide details of the new user in this form.</span>
                        </div>
                        <Input type='text' name="fullname" defaultValue={fullname} placeholder={fullname} size="lg" disabled={loading} />
                        <Input type='email' name="email" defaultValue={email} value={email} size="lg" disabled/>
                        <Select size="lg" name='role' placeholder="Select Role" required disabled={loading} 
                            onChange={(e)=>setRole(e)} value={role}>
                            <Option value="Super Admin">Super Admin</Option>
                            <Option value="Staff">Staff</Option>
                        </Select>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Spinner color="teal" size="lg" className="ml-2 self-center" />:
                        <Button variant="gradient" color='teal' type='submit' fullWidth>
                            Update User
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



// User delete
export function UserDelete({open, handler, fullname, id}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const {user} = useContext(AuthContext);

    const onSubmit = async (userId) => {
        setLoading(true)
        await deleteUser(user.token, userId).then(res => {
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
            <Card className="mx-auto w-full max-w-[480px]">
                <CardBody className="flex flex-col gap-4">
                    <IconButton onClick={handler} variant="text" className='self-end'>
                        <XMarkIcon className='h-6 w-6'/>
                    </IconButton>
                    <div className='flex flex-col items-center justify-center space-y-5'>
                        <TrashIcon className='h-20 w-20 text-red-500'/>
                        <Typography variant='h3'>
                            Delete User Account
                        </Typography>
                        <span className='font-semibold text-md text-center'>
                            You are about to delete this user. 
                            <br/>"{fullname}"<br/>
                            Are you sure ?
                        </span>
                        
                    </div>
               </CardBody>
                <CardFooter className="pt-0 flex flex-col justify-center items-center">
                    {loading ? <Spinner color="indigo" size="lg" className="h-12 w-12" /> :
                    success ? <Alert color="green">{success}</Alert> : 
                    <Button onClick={()=>onSubmit(id)} variant="outlined" color='red' fullWidth>
                        Yes, Delete User
                    </Button>}
                    {error && <Alert className='mt-2' color="red">{error}</Alert>}
                </CardFooter>
            </Card>
        </Dialog>
        </>
      )
}
