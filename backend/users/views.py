# C:\Users\Galathiea\OneDrive\Documents\eternal-dev\backend\users\views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User # Ensure User model is imported
from .serializers import UserSerializer # Ensure your UserSerializer is imported

# Import SimpleJWT views and serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# RegisterView for creating new users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)  # Allow anyone to register
    serializer_class = UserSerializer  # Use your custom UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            # Get JWT tokens for the newly created user
            user = User.objects.get(username=serializer.data['username'])
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # IMPORTANT: Removed http_method_names = ['get']
    # generics.CreateAPIView automatically handles POST requests for creation.
    # If your UserSerializer handles password hashing and validation,
    # you typically don't need to override perform_create for basic registration.
    # If you have specific logic, you can add it here.


# LoginView for obtaining JWT tokens
class LoginView(TokenObtainPairView):
    # This view inherits from SimpleJWT's TokenObtainPairView,
    # which is specifically designed to handle POST requests
    # to exchange username/password for access and refresh tokens.
    serializer_class = TokenObtainPairSerializer

    # IMPORTANT: Removed http_method_names = ['get']
    # TokenObtainPairView inherently handles POST requests.
    # Do NOT add a custom get() method here unless you have a very specific,
    # non-standard reason, as it will break the POST functionality.

# Current User View
class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user