import {UserListURL, UserCreateURL, EditUserUrl, DeleteUserUrl} from '../API_Routers.jsx';


export const getUsers = async (token) => {
    const response = await fetch(UserListURL, {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    const data = await response.json();
    if (response.ok) {
        return data
    }
    return [];

}



//create a new user
export const createUser = async (user) => {
    const response = await fetch(UserCreateURL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if (response.status === 201) {
        return {
            success: true,
            data: data['message']
        }
    }
    else {
        return {
            success: false,
            data: data['detail']
        };
    }
}

//edit a user
export const editUser = async (token, body, id) => {
    const response = await fetch(EditUserUrl+id, {
        "method": "PUT",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.status === 200) {
        return {
            success: true,
            data: data['message']
        }
    }
    else {
        return {
            success: false,
            data: data['detail']
        };
    }
}


//delete a user
export const deleteUser = async (token, id) => {
    const response = await fetch(DeleteUserUrl+id, {
        "method": "DELETE",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
    });
    
    if(response.status === 204){
        return {
            success: true,
            data: 'Account Deleted Successfully'
        }
    }
    else {
        const data = await response.json();
        return {
            success: false,
            data: data['detail']
        };
    }
}