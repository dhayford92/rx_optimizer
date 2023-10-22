import {LoginURL} from '../API_Routers.jsx';


export const LoginService = async (body) => {
    const response = await fetch(LoginURL, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if(response.status === 200) {
        return {
            success: true,
            data: data
        };
    }else{
        return {success: false, message: data["detail"]};
    }
}