import requests
import json

# Registration
register_url = 'http://127.0.0.1:8000/api/users/register/'
register_data = {
    'username': 'testuser',
    'password': 'Test123!@#',
    'password2': 'Test123!@#',
    'email': 'test@example.com',
    'first_name': 'Test',
    'last_name': 'User'
}

response = requests.post(register_url, json=register_data)
print('Registration Response:', response.json())

# Login
login_url = 'http://127.0.0.1:8000/api/users/login/'
login_data = {
    'username': 'testuser',
    'password': 'Test123!@#'
}

response = requests.post(login_url, json=login_data)
print('Login Response:', response.json()) 