"use client"
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Menu, MenuHandler, MenuList, MenuItem, Typography, Button } from "@material-tailwind/react";
import {useState, useEffect, useContext} from 'react'
import CreateUser, {UserDelete, UserEdit}  from '@/components/UserCrud'
import {getUsers} from '@/utils/services/UserServices'
import { AuthContext } from '@/context/AuthProvider';

export default function AllUsers() {
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false)
    const handlerCreate = () => setOpen((prev)=>!prev);
    const [edit, setEdit] = useState(false)
    const [userDetails, setUserDetails] = useState({id: 0, fullname: '',email: '',role: ''})

    const handlerEdit = (fullname, email, role, id) => {
        setUserDetails({id, fullname, email, role});
        setEdit((prev)=>!prev)
    };
    const [deleteUser, setDeleteUser] = useState(false)
    const handlerDelete = (id, fullname, email, role) => {
        setUserDetails({id, fullname, email, role});
        setDeleteUser((prev)=>!prev)
    };
    


    useEffect(() => {
        getUsers(user.token).then((data)=>{
            setUsers(data);
        });
    }, [open === false, edit === false, deleteUser === false])
    
    

  return (
    <div className='pl-60 pr-5 ml-20 pt-10'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-semibold text-gray-900'>All Users</h1>
                <p className='text-gray-800 mt-2'>A quick data overview of the all staff members</p>
            </div>
            <Button color='teal' onClick={()=>handlerCreate()}>Add New User</Button>
        </div>
      

        <div className='bg-white p-5 w-full mt-10 mb-2 rounded-md'>
            <table className='w-full table overflow-x-auto lg:overflow-x-none'>
                <thead className='border-b-2 border-gray-200'>
                    <tr>
                        <th className='text-left text-gray-600 font-semibold'>Name</th>
                        <th className='text-left text-gray-600 font-semibold'>Email</th>
                        <th className='text-left text-gray-600 font-semibold'>Role</th>
                        <th className='text-left text-gray-600 font-semibold'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {users.map(({email, fullname, role, id})=>(
                        <tr key={id} className='hover:bg-gray-100'>
                        <td className='py-3'>{fullname}</td>
                        <td className='py-3'>{email}</td>
                        <td className='py-3'>{role}</td>
                        <td className='py-3'>
                            <Menu>
                                <MenuHandler>
                                <EllipsisVerticalIcon className='w-5 h-5 cursor-pointer'/>
                                </MenuHandler>
                                <MenuList className='w-[120px] p-3'>
                                    <MenuItem color="lightBlue" className='flex items-center gap-2'
                                        onClick={()=>handlerEdit(fullname, email, role, id)}>
                                        <PencilSquareIcon className='w-5 h-5 mr-2'/>
                                        <Typography variant="small" className="font-normal">
                                            Edit
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem  color="lightBlue" className='flex items-center gap-2 mt-2'
                                     onClick={()=>handlerDelete(id, fullname, email, role)}>
                                    <TrashIcon className='w-5 h-5 mr-2'/>
                                    <Typography variant="small" className="font-normal">
                                        Delete
                                    </Typography>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <CreateUser open={open} handler={handlerCreate}/>
        <UserEdit open={edit} handler={handlerEdit} userDetail={userDetails}/>
        <UserDelete open={deleteUser} handler={handlerDelete} fullname={userDetails.fullname} id={userDetails.id}/>
    </div>
  )
}
