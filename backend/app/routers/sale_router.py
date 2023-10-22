from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.custom_fun import get_current_user
from app.schemas.sale_schema import *
from app.models.sales_models import *
from app.models.pharm_models import Meds
import random
import string


router = APIRouter(
    prefix='/api/v1/sales',
    tags=['Sales'],
)


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_sale(form: MakeSaleSchema):
    saleitems = []
    for item in form.items:
        med = await Meds.get(id=item.id)
        saleitem = await SaleItem.create(med=med, quantity=item.quantity, total=item.total)
        saleitems.append(saleitem)
    
    sale = Sales(customer_name = form.customer_name, status = form.status, payment = form.payment)
    await sale.save()
    await sale.items.add(*saleitems)
    
    return{'message': 'Successfully Created'}


    
@router.get('/', status_code=status.HTTP_200_OK, response_model=List[SaleSchema])
async def get_sales():
    sales = await Sales.all().prefetch_related('items').order_by('-id')
    list_sales = []
    for sale in sales:
        total = 0
        for item in await sale.items.all():
            total += item.total
        
        list_sales.append(SaleSchema(
            id=sale.id,
            order_id=sale.order_id,
            status=sale.status.name,
            payment=sale.payment.name,
            total= total,
            customer_name=sale.customer_name,
            items= await sale.items.all().count()
        ))
        
        # sale.items = await SaleItemSchema.from_queryset(sale.items.all())
    
    return list_sales    


@router.get('/{id}', status_code=status.HTTP_200_OK)
async def get_sale(id: int):
    pass


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_sale(id:int):
    try:
        sale = await Sales.get(id=id)
        for item in await sale.items.all():
            await item.delete()
        await sale.delete()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Sale with id {id} not found")