from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .models import ToDo, TaskCategory
from .serializers import ToDoSerializer, TaskCategorySerializer, UserSerializer

def login_user(request):
    return render(request, "login.html", )

class ToDos(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ToDo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ToDoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ToDoSerializer
    lookup_url_kwarg = "task_id"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ToDo.objects.filter(user=self.request.user)

# Add a category and get categories
class TaskCategories(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = TaskCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TaskCategory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskCategorySerializer
    lookup_url_kwarg = "category_id"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TaskCategory.objects.filter(user=self.request.user)

class TaskListByCategory(generics.ListAPIView):
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category_id = self.kwargs.get("category_id")
        return ToDo.objects.filter(task_category_id=category_id, user=self.request.user)

class RegisterTodoUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

