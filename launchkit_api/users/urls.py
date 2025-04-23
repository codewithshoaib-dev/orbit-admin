from django.urls import path
from . import views

urlpatterns = [
    path('login', views.UserLoginView.as_view(), name='login view'),
    path('register', views.UserRegisterView.as_view(), name='register view'),
    path('user', views.UserInfoView.as_view()),
    path('token/refresh', views.CookieTokenRefreshView.as_view()),
]