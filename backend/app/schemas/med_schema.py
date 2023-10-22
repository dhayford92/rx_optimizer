from pydantic import BaseModel, Field
from tortoise.contrib.pydantic import pydantic_model_creator
from typing import List
from app.models.pharm_models import *


GroupMed = pydantic_model_creator(
    Group,
    name='Group Schema',
    exclude_readonly=True
)

class GroupSchema(BaseModel):
    id: int = Field(..., example=1)
    name: str = Field(..., example='Group name')
    number_of_meds: int = Field(..., example=10)
    description: str = Field(..., example='Group description')
    
    class Config:
        orm_mode = True
        
        


GenMeds = pydantic_model_creator(
    Meds,
    name='General Meds',
    exclude_readonly=True
)

class GroupDetail(GroupMed, BaseModel):
    id: int
    meds: List[GenMeds]
    
    class Config:
        orm_mode = True


        

class MedSchema(BaseModel):
    name: str = Field(..., example='Med name')
    how_to_use: str = Field(..., example='How to use')
    side_effect: str = Field(..., example='Side effect')
    quantity: int = Field(..., example=10)
    group: int = Field(..., example=1)
    
        

class MedsSchema(MedSchema, BaseModel):
    id: int = Field(..., example=1)
    med_id: str = Field(..., example='Med ID')
    group: str = Field(..., example='Group name')
    
    
    class Config:
        orm_mode = True