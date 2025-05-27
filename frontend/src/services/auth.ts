export async function login(email: string, password: string) {
  // Example: Replace with your API call
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function logout() {
  // Example: Replace with your API call
  await fetch('/api/logout', { method: 'POST' });
}

export async function register(data: { email: string; password: string; name: string }) {
  // Example: Replace with your API call
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}