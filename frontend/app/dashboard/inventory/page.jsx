"use client"
import { EllipsisVerticalIcon, PencilSquareIcon, ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {Breadcrumbs ,  Menu, MenuHandler, MenuList, MenuItem, Typography, Button, Select, Option } from "@material-tailwind/react";
import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/navigation'
import { AuthContext } from '@/context/AuthProvider';
import { getAllGroups, getAllmeds } from '@/utils/services/MedServces';
import {MedsCreate, MedsEdit} from '@/components/MedicineCards/CreateEditMeds';


export default function AllMeds() {
    const router = useRouter();
    const {user} = useContext(AuthContext);
    const [groups, setGroups] = useState([])
    const [fliters, setFilters] = useState('all')
    const [meds, setMeds] = useState([])
    const [open, setOpen] = useState(false)
    const handlerCreate = () => setOpen((prev)=>!prev);
    const [edit, setEdit] = useState(false)
    const [med, setMed] = useState(null)
    const handlerEdit = (id, name, med_id, group, quantity, how_to_use, side_effect) => {
        setEdit((prev)=>!prev);
        setMed({id, name, med_id, group, quantity, how_to_use, side_effect})
    }

    useEffect(()=>{
        getAllGroups(user.token).then((res)=> {
            setGroups(res)
        })
        getAllmeds(user.token, fliters === 'all'?'':fliters).then((res)=> {
            setMeds(res)
        })
    },[open===false])
    
    

  return (
    <div className='pl-60 pr-5 ml-20 pt-10'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-2'>
            <Breadcrumbs fullWidth
            separator={
                <ChevronRightIcon className="h-6 w-6 text-gray-500" strokeWidth={2.5} />
              }
            >
                <h1 className='text-3xl font-semibold text-gray-400'>
                    Inventory
                </h1>
                <h1 className='text-3xl font-semibold text-gray-900'>
                    List of Medicines (298)
                </h1>
            </Breadcrumbs>
                <p className='text-gray-800 mt-2 pl-5'>List of medicines available for sales.</p>
            </div>
            <Button color='teal' onClick={()=>handlerCreate()}>Add New Medicine</Button>
        </div>
              
        <div className='right-1 w-[300px] mt-4'>
            <Select color='lightBlue' name='group' value={fliters} onChange={(e)=>setFilters((prev)=>e)} label='Select Group' fullWidth>
                <Option value="all">All</Option>
                {groups.map(({id, name})=>(
                    <Option key={id} value={name}>{name}</Option>
                ))}
            </Select>
        </div>
        <div className='bg-white p-5 w-full mt-10 mb-2 rounded-md'>
            <table className='w-full table overflow-x-auto lg:overflow-x-none'>
                <thead className='border-b-2 border-gray-200'>
                    <tr>
                        <th className='text-left text-gray-600 font-semibold'>Medicine Name</th>
                        <th className='text-left text-gray-600 font-semibold'>Medicine ID</th>
                        <th className='text-left text-gray-600 font-semibold'>Group Name</th>
                        <th className='text-left text-gray-600 font-semibold'>Stock in Qty</th>
                        <th className='text-left text-gray-600 font-semibold'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {meds.map(({id, name, med_id, group, quantity, how_to_use, side_effect})=>(
                    <tr key={id} className='hover:bg-gray-100'>
                        <td className='py-3'>{name}</td>
                        <td className='py-3'>{med_id}</td>
                        <td className='py-3'>{group}</td>
                        <td className='py-3'>{quantity}</td>
                        <td className='py-3'>
                            <Menu>
                                <MenuHandler>
                                <EllipsisVerticalIcon className='w-5 h-5 cursor-pointer'/>
                                </MenuHandler>
                                <MenuList className='w-[120px] p-3'>
                                    <MenuItem color="lightBlue" className='flex items-center gap-2'
                                        onClick={()=>handlerEdit(id, name, med_id, group, quantity, how_to_use, side_effect)}>
                                        <PencilSquareIcon className='w-5 h-5 mr-2'/>
                                        <Typography variant="small" className="font-normal">
                                            Edit
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem  color="lightBlue" className='flex items-center gap-2 mt-2'
                                     onClick={()=>router.push(`inventory/${id}`)}>
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
        <MedsCreate open={open} handler={handlerCreate}/>
        <MedsEdit open={edit} handler={handlerEdit} oldData={med}/>
    </div>
  )
}
