from .models import ToDo, TaskCategory
from rest_framework.serializers import ModelSerializer, ReadOnlyField, CharField, ValidationError
from django.contrib.auth.models import User


class TaskCategorySerializer(ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = "__all__"
        read_only_fields = ("user",)

class ToDoSerializer(ModelSerializer):
    task_category_title = ReadOnlyField(source="task_category.category_title")
    class Meta:
        model = ToDo
        fields = ("id", "task_category", "task_description", "task_created", "task_title", "task_end", "task_completed", "task_priority", "task_category_title")
        read_only_fields = ("user",)

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True, min_length=8)
    confirm_password = CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ["username", "password", "confirm_password"]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            return ValidationError({"password": "passwords do not match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(username=validated_data["username"], password=validated_data["password"])

        return user

