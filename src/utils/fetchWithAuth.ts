import { getToken } from '../services/auth';

// fetchWithAuth.ts
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const accessToken = getToken();
  const headers = new Headers(options.headers || {});

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
