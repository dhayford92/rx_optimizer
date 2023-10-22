from pydantic import BaseModel, EmailStr, Field
from tortoise.contrib.pydantic import pydantic_model_creator
from app.models.user_models import User, AdminUserRole
from typing import List


# --- Login Schema In ---
class LoginSchemaIn(BaseModel):
    email: EmailStr = Field(..., max_length=255)
    password: str = Field(..., min_length=2, max_length=255)



# --- Login Schema Out ---
class LoginSchemaOut(BaseModel):
    id: int
    fullname: str
    email: str
    role: str
    token: str
    
    class Config:
        orm_base = True
    
    

# --- User Schema ---
class UserSchema(BaseModel):
    id: int
    fullname: str
    email: str
    role: str
    
    class Config:
        orm_base = True



class UserSchemaIn(LoginSchemaIn, BaseModel):
    fullname: str = Field(..., min_length=3, max_length=255)
    role: str = AdminUserRole.super_admin
    

class UserSchemaUpdate(BaseModel):
    fullname: str = Field(..., min_length=3, max_length=255)
    role: str
    


