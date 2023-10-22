from tortoise import fields, models
from enum import Enum



# -- Pharm Group Models -- #
class Group(models.Model):
    name = fields.CharField(max_length=255, unique=True)
    description = fields.TextField(null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        table = "groups"
        


# `Meds` model
class Meds(models.Model):
    med_id = fields.CharField(max_length=255, unique=True)
    name = fields.CharField(max_length=255)
    how_to_use = fields.TextField(null=True)
    side_effect = fields.TextField(null=True)
    group = fields.ForeignKeyField('models.Group', related_name='meds')
    quantity = fields.IntField()
    created_at = fields.DatetimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        table = "meds"