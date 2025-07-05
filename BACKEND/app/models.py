from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    minimum_quantity = models.PositiveIntegerField(default=5)  # default = 5
