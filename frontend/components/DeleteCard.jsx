"use client"
import { Card, CardBody, IconButton, Typography, Dialog, CardFooter, Button, Spinner, Alert } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";


export default function DeleteCard({open, handler, title, id, api, cardName }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const {user} = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = async (userId) => {
        setLoading(true)
        const response = await fetch(api+userId, {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
        });
        
        if (response.status === 204) {
            setLoading(false)
            setSuccess("Successfully Deleted")
            setTimeout(() => {
                setSuccess(null)
                router.back();
                handler();
            }, 3000);
        }else{
            const data = await response.json();
            setLoading(false)
            setError(data['detail'])
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
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
                            Delete {cardName} Account
                        </Typography>
                        <span className='font-semibold text-md text-center'>
                            You are about to delete this {cardName}. 
                            <br/>"{title}"<br/>
                            Are you sure ?
                        </span>
                        
                    </div>
               </CardBody>
                <CardFooter className="pt-0 flex flex-col justify-center items-center">
                    {loading ? <Spinner color="indigo" size="lg" className="h-12 w-12" />:
                    success ? <Alert color="green">{success}</Alert> :
                    <Button onClick={()=>onSubmit(id)} variant="outlined" color='red' fullWidth>
                        Yes, Delete {cardName}
                    </Button>}
                    {error && <Alert className="mt-5" color="red">{error}</Alert>}
                </CardFooter>
            </Card>
        </Dialog>
        </>
      )
}