from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.custom_fun import authenticate_user, token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from app.schemas.user_schema import *
from passlib.context import CryptContext
from app.models.user_models import *


router = APIRouter(
    prefix='/api/v1/user',
    tags=['User'],
)


# --- Create User Route ---
@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create(field: UserSchemaIn):
    data = dict(field)
    data['email'] = field.email.lower()
    pwd_verify = CryptContext(schemes=['bcrypt'], deprecated='auto')
    data['password'] = pwd_verify.hash(data['password'])
    user = await User.filter(email=data['email']).exists()
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already exists')
    try:
        await User.create(**data)
        return {'message': 'User created successfully'}
    except:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Something went wrong')
    
    
# --- Get All Users Route ---
@router.get('/all', status_code=status.HTTP_200_OK, response_model=List[UserSchema])
async def get_all(current_user: get_current_user=Depends()):
    users = await User.all()
    list_users = []

    for user in users:
        if current_user.id != user.id:
            list_users.append(UserSchema(id=user.id, fullname=user.fullname, email=user.email, role=user.role.value))
    return list_users


# --- Get User By ID Route ---
@router.get('/detail/{id}', status_code=status.HTTP_200_OK, response_model=UserSchema)
async def get_by_id(id: int, current_user: get_current_user=Depends()):
    try:
        user = await User.get(id=id)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    
    return await UserSchema.from_tortoise_orm(user)



# --- Update User Route --- 
@router.put('/update/{id}', status_code=status.HTTP_200_OK)
async def update(id: int, field: UserSchemaUpdate, current_user: get_current_user = Depends()):
    try:
        await User.filter(id=id).update(**dict(field))
        return {'message': 'User updated successfully'}
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    


# --- Delete User Route ---
@router.delete('/delete/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete(id: int, current_user: str = Depends(get_current_user)):
    try:
        user = await User.get(id=id)
        await user.delete()
        return {'message': 'User deleted successfully'}
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    