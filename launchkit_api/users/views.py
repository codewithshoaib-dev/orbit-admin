from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserLoginSerializer, UserRegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class UserLoginView(APIView):
    def post(self, request):
       serializer = UserLoginSerializer(data=request.data)
       serializer.is_valid(raise_exception=True)

       user = serializer.validated_data['user']

       refresh = RefreshToken.for_user(user)

       return Response({'refresh': str(refresh),
                        'access': str(refresh.access_token)},
                        status=status.HTTP_200_OK)
