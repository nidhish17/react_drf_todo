from django.contrib import admin
from .models import ToDo, TaskCategory

# Register your models here.
admin.site.register(ToDo)
admin.site.register(TaskCategory)