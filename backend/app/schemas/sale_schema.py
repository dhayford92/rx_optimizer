from pydantic import BaseModel, Field
from tortoise.contrib.pydantic import pydantic_model_creator
from typing import List
from app.models.sales_models import *



class SaleItemSchema(BaseModel):
    id: int
    quantity: int
    total: float
    
    
class MakeSaleSchema(BaseModel):
    items: List[SaleItemSchema]
    status: str
    payment: str
    customer_name: str
    
    

class SaleSchema(BaseModel):
    id: int
    order_id: str
    status: str
    payment: str
    total: float
    customer_name: str
    items: int | List[SaleItemSchema] = Field(..., alias="items")
    
    class Config:
        orm_mode = True