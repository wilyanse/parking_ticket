from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer

User = get_user_model()

class IsAdminOrSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow admins to access any user
        if permissions.IsAdminUser().has_permission(request, view):
            return True
        # Allow users to access only their own record
        return obj == request.user

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['list', 'destroy']:
            return [permissions.IsAdminUser()]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            return [IsAdminOrSelf()]
        else:
            return super().get_permissions()

    
    @action(detail=True, methods=["patch"], permission_classes=[permissions.IsAdminUser])
    def reactivate(self, request, pk=None):
        user = self.get_object()
        self.check_object_permissions(request, user)  # 🔥 This enforces IsAdminOrSelf

        user.is_active = True
        user.save()
        return Response({"detail": f"User '{user.username}' reactivated."})