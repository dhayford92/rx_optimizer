from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.custom_fun import get_current_user
from app.schemas.med_schema import *
from app.models.pharm_models import *
import random
import string


router = APIRouter(
    prefix='/api/v1/med',
    tags=['Inventory'],
)


# -- Get all groups --
@router.get('/groups', response_model=List[GroupSchema], status_code=200)
async def all_Groups(current_user: get_current_user=Depends()):
    all_meds_group = [
        GroupSchema(
            id=med_group.id,
            name=med_group.name,
            description=med_group.description,
            number_of_meds=len(await Meds.filter(group=med_group.id))
        ) for med_group in await Group.all()]
    return all_meds_group


# -- Get one group --
@router.get('/groups/{group_id}', response_model=GroupDetail, status_code=200)
async def get_group(group_id: int):
    try:
        group = await Group.get(id=group_id)
        meds = await Meds.filter(group=group)
        return GroupDetail(id=group.id, name=group.name, description=group.description, meds=meds)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Group not found')
    
    

# -- Create new group --
@router.post('/groups', status_code=201)
async def create_group(group: GroupMed, current_user: get_current_user=Depends()):
    data = group.dict(exclude_unset=True)
    try:
        await Group.create(**data)
        return {
            'message': 'Group created successfully'
        }
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Group not created')
    

# -- Update group --
@router.put('/groups/{group_id}', status_code=200)
async def update_group(group_id: int, group: GroupMed, current_user: get_current_user=Depends()):
    try:
        await Group.filter(id=group_id).update(**group.dict(exclude_unset=True))
        return {
            'message': 'Group updated successfully'
        }
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Group not updated')    
    

# -- Delete group --
@router.delete('/groups/{group_id}', status_code=204)
async def delete_group(group_id: int, current_user: get_current_user=Depends()):
    try:
        group = await Group.get(id=group_id)
        await group.delete()
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Group not found')
    
    
    
# # -- Get all meds --
@router.get('/', response_model=List[MedsSchema], status_code=200)
async def all_meds(group: str = None, current_user: get_current_user=Depends()):
    meds = await Meds.filter(group__name__icontains=group).order_by('name').all()
    list_meds = []
    for med in meds:
        med.fetch_related('group')
        group = await Group.get(id=med.group_id).values('name')
        list_meds.append(
            MedsSchema(
            id=med.id, 
            med_id=med.med_id,
            name=med.name,
            group= group.get('name'),
            side_effect=med.side_effect,
            quantity=med.quantity,
            how_to_use=med.how_to_use
        ))
    return list_meds



# # -- Get one med --  
@router.get('/{id}', response_model=MedsSchema, status_code=200)
async def get_med(id: int, current_user: get_current_user=Depends()):
    try:
        med = await Meds.get(id=id)
        group = await Group.get(id=med.group_id).values('name')
        await med.fetch_related('group')
        return MedsSchema(
            id=med.id, 
            med_id=med.med_id,
            name=med.name,
            group=group.get('name'),
            side_effect=med.side_effect,
            quantity=med.quantity,
            how_to_use=med.how_to_use,
        )
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Med not found')
    
    
# search med by name
@router.get('/search/', response_model=MedsSchema, status_code=200)
async def get_med(name: str = None):
    try:
        med = await Meds.filter(name__icontains=name).first()
        if not med:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Med not found')
        group = await Group.get(id=med.group_id).values('name')
        await med.fetch_related('group')
        return MedsSchema(
            id=med.id, 
            med_id=med.med_id,
            name=med.name,
            group=group.get('name'),
            side_effect=med.side_effect,
            quantity=med.quantity,
            how_to_use=med.how_to_use,
        )
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Med not found')

    
# # -- Create new med --
@router.post('/', status_code=201)
async def create_med(med: MedSchema, current_user: get_current_user=Depends()):
    try:
        group = await Group.get(id=med.group)
        med = await Meds(
            med_id=''.join(random.choices(string.ascii_uppercase + string.digits, k=6)), 
            name=med.name, group=group, 
            side_effect=med.side_effect, 
            quantity=med.quantity, how_to_use=med.how_to_use
        ).save()
        return {
            'message': 'Med created successfully'
        }
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Med not created')
    
    
# -- Delete group --
@router.delete('/{id}', status_code=204)
async def delete_med(id: int, current_user: get_current_user=Depends()):
    try:
        med = await Meds.get(id=id)
        await med.delete()
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Medicine not found')



@router.put('/{id}', status_code=200)
async def update_med(id: int, med: MedSchema, current_user: get_current_user=Depends()):
    try:
        group = await Group.get(id=med.group)
        await Meds.filter(id=id).update(
            name=med.name, group=group, 
            side_effect=med.side_effect, 
            quantity=med.quantity, how_to_use=med.how_to_use
        )
        return {
            'message': 'Med updated successfully'
        }
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Med not updated')