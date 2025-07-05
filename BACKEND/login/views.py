#from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        return JsonResponse({'message': 'Login successful', 'username': user.username})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)#


from django.shortcuts import render, redirect
from django.http import HttpResponse

# Login page view
def login_view(request):
    return render(request, 'login/login.html')  # Hakikisha una template hiyo

# Dashboard page view
def dashboard_view(request):
    return render(request, 'login/dashboard.html')  # Hakikisha una template hiyo
