from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer


User = get_user_model()

# Custom permission to allow admins to access any user, and users to access only their own record
# This permission class is used to restrict access to user records based on the user's role.
class IsAdminOrSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow admins to access any user
        if permissions.IsAdminUser().has_permission(request, view):
            return True
        # Allow users to access only their own record
        return obj == request.user

# This file contains the viewsets for user management and JWT token handling.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        # Only non-admin users for list, all users for retrieve/update/etc.
        if self.action == 'list':
            return User.objects.filter(is_staff=False)
        return User.objects.all()

    # Customizing permissions for different actions
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['list', 'destroy']:
            return [permissions.IsAdminUser()]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            return [IsAdminOrSelf()]
        else:
            return super().get_permissions()
        
    # Custom reactivation method to allow admins to give login access to a deactivated user
    @action(detail=True, methods=["patch"], permission_classes=[permissions.IsAdminUser])
    def reactivate(self, request, pk=None):
        user = self.get_object()
        self.check_object_permissions(request, user)  # 🔥 This enforces IsAdminOrSelf

        user.is_active = True
        user.save()
        return Response({"detail": f"User '{user.username}' reactivated."})
    

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer