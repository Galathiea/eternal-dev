interface LoginResponse {
  access_token: string
  user?: {
    name: string
    email: string
    profileImage?: string
  }
}

interface RegisterResponse {
  access_token: string
  user: {
    name: string
    email: string
  }
}

export const authService = {
  async login(credentials: { username: string; password: string }): Promise<LoginResponse> {
    const response = await fetch('http://your-backend-url/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Login failed')
    }

    return response.json()
  },

  async register(data: {
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
    password2: string
  }): Promise<RegisterResponse> {
    const response = await fetch('http://your-backend-url/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Registration failed')
    }

    return response.json()
  },

  async logout(): Promise<void> {
    // Add any API call for logout if needed
    return Promise.resolve()
  }
}