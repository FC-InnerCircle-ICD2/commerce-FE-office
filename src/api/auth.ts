import { BASE_URL } from '../utils/apiUrl';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const MEMBER_URL = 'https://member-api.emmotional-cart.click/';

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

export async function getMyInfo() {
  fetchWithAuth(`${MEMBER_URL}api/v1/members/me`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => console.log('데이터:', data))
    .catch((error) => console.error('에러 발생:', error));
}
