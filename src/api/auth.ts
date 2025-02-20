import { BASE_URL } from '../utils/apiUrl';

export async function join(email: string, password: string, phone: string, userName: string) {
  const result = await fetch(`${BASE_URL}/api/v1/admin/members/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, phone, userName }),
  });

  const data = await result.json();
  return data;
}
