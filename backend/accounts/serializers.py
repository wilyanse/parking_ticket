from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

# Serializers for User model and JWT token
# This file contains serializers for the User model and JWT token handling.
class UserSerializer(serializers.ModelSerializer):
    # Disallows password from being read
    password = serializers.CharField(write_only=True)

    # Planned for Mailgun integration
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff', 'password']
        read_only_fields = ['id']

    # Custom create method to handle user creation
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            is_active=validated_data.get('is_active', True),
            is_staff=validated_data.get('is_staff', True)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims for frontend access
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['email'] = user.email
        return token