from tortoise import fields, models
from enum import Enum
import random
import string



class SaleItem(models.Model):
    med = fields.ForeignKeyField('models.Meds', on_delete=fields.CASCADE)
    total = fields.FloatField(default=0.0)
    quantity = fields.IntField()
    
    def __str__(self):
        return self.med.name
    
    class Meta:
        table = "sales_item"


class OrderStatus(Enum):
    Pending = 'Pending'
    Processing = 'Processing'
    Completed = 'Completed'


class PaymentStatus(Enum):
    CreditCard = 'CreditCard'
    MobileMoney = 'MobileMoney'
    Paypal = 'Paypal'
    Physical = 'Physical'
    


class Sales(models.Model):
    order_id = fields.CharField(max_length=200, unique=True)
    items = fields.ManyToManyField('models.SaleItem')
    status = fields.CharEnumField(OrderStatus, default=OrderStatus.Pending)
    payment = fields.CharEnumField(PaymentStatus, default=PaymentStatus.CreditCard, blank=True, max_length=200)
    customer_name = fields.CharField(max_length=200)
    created_at = fields.DatetimeField(auto_now_add=True)
    
    def __str__(self):
        return self.order_id
    
    async def save(self):
        self.order_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        return await super().save()
    
    class Meta:
        table = "sales"