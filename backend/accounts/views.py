from rest_framework import viewsets, permissions
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer

User = get_user_model()

class IsAdminOrSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow admins to access any user
        if request.user.groups.filter(name='admin').exists():
            return True
        # Allow users to access only their own record
        return obj == request.user

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['create', 'list', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsAdminOrSelf()]
