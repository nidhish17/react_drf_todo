from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path("login/", views.login_user, name="login"),
    path("register/", views.RegisterTodoUser.as_view(), name="register"),
    path("tasks/", views.ToDos.as_view()),
    path("tasks/<int:task_id>/", views.ToDoDetail.as_view()),
    path("categories/", views.TaskCategories.as_view()),
    path("categories/<int:category_id>", views.TaskCategoryDetail.as_view()),
    path("tasks/filter/<int:category_id>", views.TaskListByCategory.as_view()),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

