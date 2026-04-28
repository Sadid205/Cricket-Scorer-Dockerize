import email

from rest_framework import serializers
from .models import Author
from django.contrib.auth.models import User

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password','confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'username': {'validators':[]},
            'email': {'validators':[]},
        }

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({"Error": "Password doesn't matched."})

        if User.objects.filter(email=email, is_active=True).exists():
            raise serializers.ValidationError({"email": "Email already exists"})
        if User.objects.filter(username=username, is_active=True).exists():
            raise serializers.ValidationError({"username": "Username already exists"})

        if User.objects.filter(username=username, is_active=False).exists():
            if not User.objects.filter(username=username, email=email, is_active=False).exists():
                raise serializers.ValidationError({"username": "Username already taken, please choose another."})

        if User.objects.filter(email=email, is_active=False).exists():
            if not User.objects.filter(username=username, email=email, is_active=False).exists():
                raise serializers.ValidationError({"email": "Email already taken, please choose another."})

        return data

    def save(self):
        username = self.validated_data['username']
        first_name = self.validated_data['first_name']
        last_name = self.validated_data['last_name']
        email = self.validated_data['email']
        password = self.validated_data['password']

        if User.objects.filter(username=username, email=email, is_active=False).exists():
            return User.objects.get(username=username, email=email, is_active=False)
        
        user_account = User(username=username,email=email,first_name=first_name,last_name=last_name)
        user_account.set_password(password)
        user_account.is_active = False
        user_account.save()
        new_author = Author(user=user_account)
        new_author.save()
        return user_account

class AuthorLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)