from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.user_models import User
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt
from app.utils.db import *
from pydantic import ValidationError



security = HTTPBearer(
    scheme_name='Authentorization',
    description='Bearer authentication credentials for authentication to access the API'
)



    
# --- authorization function --------------------
async def authenticate_user(email: str, password: str):
    user = await User.get_or_none(email=email)
    if user and user.verify_password(password):
        return user
    return None 


# ---- Create Token ----
ACCESS_TOKEN_EXPIRE_MINUTES = timedelta(days=1)

def token(subject: Union[str, Any], expires_delta: timedelta = None):
    expires_delta = datetime.utcnow() + expires_delta
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt



# --- get current user
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM]
        )
        if datetime.fromtimestamp(payload['exp']) <= datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = await User.get_or_none(email=payload['sub'])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    
    return user