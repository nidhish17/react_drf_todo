from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User


class TaskCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category_title = models.CharField(max_length=200)

    def __str__(self):
        return self.category_title


class ToDo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task_title = models.CharField(max_length=200)
    task_description = models.TextField(blank=True)
    task_completed = models.BooleanField(default=False)
    task_created = models.DateTimeField(auto_now_add=True)
    task_end = models.DateTimeField(blank=True, null=True)
    task_priority = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(5), MinValueValidator(1)])
    task_category = models.ForeignKey(TaskCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.task_title



