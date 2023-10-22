import {GroupURL, MedicineURL, SalesURL} from '../API_Routers.jsx';


export const getAllGroups = async (token) => {
    const response = await fetch(GroupURL, {
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


//create a new group
export const createGroup= async (body, token) => {
    const response = await fetch(GroupURL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
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
export const editGroup = async (token, body, id) => {
    const response = await fetch(`${GroupURL}/${id}`, {
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


//get group by id
export const getGroup = async (token, id) => {
    const response = await fetch(GroupURL+"/"+id, {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    });

    const data = await response.json();
    if (response.ok) {
        return data
    }
    return {};

}


//delete a user
export const deleteGroup = async (token, id) => {
    const response = await fetch(`${GroupURL}/${id}`, {
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


// get all medicines
export const getAllmeds = async (token, name) => {
    const response = await fetch(MedicineURL+"?group="+name, {
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


//create a new med
export const createMed= async (body, token) => {
    const response = await fetch(MedicineURL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
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


//get a med
export const getMed= async (token, id) => {
    const response = await fetch(MedicineURL+id, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });
    const data = await response.json();
    if (response.status === 200) {
        return {
            success: true,
            data: data
        }
    }
    else {
        return {
            success: false,
            data: {}
        };
    }
}


//search a med
export const searchMed= async (name) => {
    const response = await fetch(MedicineURL+`search/?name=${name}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (response.status === 200) {
        return {
            success: true,
            data: data
        }
    }
    else {
        return {
            success: false,
            data: data['detail']
        };
    }
}



//edit a med
export const editMed= async (body, token,  id) => {
    const response = await fetch(MedicineURL+id, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
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




//create a new sale
export const createSale= async (body) => {
    const response = await fetch(SalesURL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data)
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


//get all sales
export const getSales= async () => {
    const response = await fetch(SalesURL, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status === 200) {
        return {
            success: true,
            data: data
        }
    }
    else {
        return {
            success: false,
            data: data['detail']
        };
    }
}