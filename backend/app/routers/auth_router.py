from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.custom_fun import authenticate_user, token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from app.schemas.user_schema import *
from passlib.context import CryptContext
from app.models.user_models import *


router = APIRouter(
    prefix='/api/v1/auth',
    tags=['Authentication'],
)


# --- Login Routes ---
@router.post('/login', status_code=status.HTTP_200_OK, response_model=LoginSchemaOut)
async def login(fields: LoginSchemaIn):
    user = await authenticate_user(fields.email.lower(), fields.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid email or password')
    
    access_token = token(user.email, ACCESS_TOKEN_EXPIRE_MINUTES)
    return LoginSchemaOut(
        id=user.id,
        fullname=user.fullname,
        email=user.email,
        role=user.role.value,
        token=access_token)
    
