"use client"
import { AuthContext } from "@/context/AuthProvider";
import { LoginService } from "@/utils/services/LoginService";
import {
  Card,CardHeader, Alert, Spinner,
  CardBody,CardFooter,
  Typography,Input,
  Checkbox,Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";




export default function Home() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);
    
    await LoginService({'email': data.get('email'), 'password': data.get('password')}).then((response) => {

      if (response.success) {
        const { id, token, fullname, email, role } = response['data'];
        setUser({ id, token, fullname, email, role});
        localStorage.setItem('user', JSON.stringify({ id, token, fullname, email, role}));
        setLoading(false);
        router.push('/dashboard');
      } else {
        setLoading(false);
        setError(response['message']);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }).catch((error) => {
      setLoading(false);
      setError(error['message']);
      setTimeout(() => {
        setError(null);
      }, 3000);
    });

  }


 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-96">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <CardHeader variant="gradient" 
            color="teal" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" name="email" size="lg" required disabled={loading}/>
            <Input type="password" label="Password" name="password" size="lg" required disabled={loading}/>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {loading ? <Spinner className="h-12 w-12 items-center" color="teal" size="lg" /> : 
            <Button type="submit" color="teal" variant="gradient" fullWidth>
              Sign In
            </Button>}
            {error && <Alert color="red" className="mt-3"> {error} </Alert>}
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
