"use client"
import { EllipsisVerticalIcon, PencilSquareIcon, ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {Breadcrumbs, Menu, MenuHandler, MenuList, MenuItem, Typography, Button } from "@material-tailwind/react";
import {useState, useEffect, useContext} from 'react'
import { GroupCreate, GroupEdit } from '@/components/MedicineCards/CreateEditGroup';
import {useRouter} from 'next/navigation'
import { AuthContext } from '@/context/AuthProvider';
import { getAllGroups } from '@/utils/services/MedServces';



export default function Groups() {
    const router = useRouter();
    const {user} = useContext(AuthContext);
    const [groups, setGroups] = useState([])

    const [open, setOpen] = useState(false)
    const handlerCreate = () => setOpen((prev)=>!prev);

    const [edit, setEdit] = useState(false)
    const [groupDetail, setGroupDetail] = useState({id: 0, name: '', description: ''})

    const handlerEdit = (id, name, description) => {
        setGroupDetail({id, name, description});
        setEdit((prev)=>!prev)
    };

    useEffect(() => {
        getAllGroups(user.token).then((res)=> {
            setGroups(res)
        })
    }, [open === false, edit === false])

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
                <h1 className='text-3xl font-semibold text-gray-900'>
                    List of Medicine Groups
                </h1>
            </Breadcrumbs>
                <p className='text-gray-800 mt-2 pl-5'>List of medicines available for sales.</p>
            </div>
            <Button onClick={()=>handlerCreate()} color='teal'>Add New Group</Button>
        </div>

        <div className='bg-white p-5 w-full mt-10 mb-2 rounded-md'>
            <table className='w-full table overflow-x-auto lg:overflow-x-none'>
                <thead className='border-b-2 border-gray-200'>
                    <tr>
                        <th className='text-left text-gray-600 font-semibold'>Group ID</th>
                        <th className='text-left text-gray-600 font-semibold'>Group Name</th>
                        <th className='text-left text-gray-600 font-semibold'>No. of Meds</th>
                        <th className='text-left text-gray-600 font-semibold'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {groups.map(({id, name, description, number_of_meds})=>(
                        <tr key={id} className='hover:bg-gray-100'>
                            <td className='py-3'>AQ{id}YDC</td>
                            <td className='py-3'>{name}</td>
                            <td className='py-3'>{number_of_meds}</td>
                            <td className='py-3'>
                                <Menu>
                                    <MenuHandler>
                                    <EllipsisVerticalIcon className='w-5 h-5 cursor-pointer'/>
                                    </MenuHandler>
                                    <MenuList className='w-[120px] p-3'>
                                        <MenuItem onClick={()=>handlerEdit(id, name, description)} color="lightBlue" className='flex items-center gap-2'>
                                            <PencilSquareIcon className='w-5 h-5 mr-2'/>
                                            <Typography variant="small" className="font-normal">
                                                Edit
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem  color="lightBlue" className='flex items-center gap-2 mt-2'
                                        onClick={()=>router.push(`groups/${id}`)}>
                                        <ArrowTopRightOnSquareIcon className='w-5 h-5 mr-2'/>
                                        <Typography variant="small" className="font-normal">
                                            View
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

        <GroupCreate open={open} handler={handlerCreate}/>
        <GroupEdit open={edit} handler={handlerEdit} groupDetails={groupDetail}/>
    </div>
  )
}
