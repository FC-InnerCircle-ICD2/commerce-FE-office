import { getToken } from '../services/auth';
import { BASE_URL } from '../utils/apiUrl';

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

export async function getMe() {
  const token = getToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  fetch(`${MEMBER_URL}api/v1/members/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
    .then((response) => {
      // 헤더에서 토큰 값 가져오기
      return response.json();
    })
    .then((data) => console.log('데이터:', data))
    .catch((error) => console.error('에러 발생:', error));
}
