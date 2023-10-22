from tortoise import fields, models
from enum import Enum
from passlib.context import CryptContext


class AdminUserRole(Enum):
    super_admin = "Super Admin"
    staff = "Staff"

    

# --- User Model ---
class User(models.Model):
    fullname = fields.CharField(max_length=250)
    email = fields.CharField(max_length=250)
    password = fields.CharField(max_length=250)
    role = fields.CharEnumField(AdminUserRole, default=AdminUserRole.super_admin)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    
    class Meta:
        table = 'user'
        table_description = 'Users Model'
        
    def __str__(self):
        return self.fullname
    
    def verify_password(self, password):
        pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
        return pwd_context.verify(password, self.password)
    



# --- Customer User Model ---
class CustomerUser(models.Model):
    fullname = fields.CharField(max_length=250)
    email = fields.CharField(max_length=250, null=True)
    phone = fields.CharField(max_length=250, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    
    class Meta:
        table = 'customer_user'
        table_description = 'Customer Users Model'
        
    def __str__(self):
        return self.fullname
    
    