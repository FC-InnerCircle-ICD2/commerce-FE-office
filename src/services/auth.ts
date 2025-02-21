// src/services/authService.ts
export const TOKEN_KEY = 'access_token';
export const REFRESH_KEY = 'refresh_token';

// ✅ 토큰 저장 (localStorage 또는 sessionStorage)
export const setToken = (token: string, refresh: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refresh);
};

// ✅ 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefresh = () => {
  return localStorage.getItem(REFRESH_KEY);
};

// ✅ 토큰 삭제 (로그아웃)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

// ✅ 사용자 인증 여부 확인
export const isAuthenticated = () => {
  return !!getToken();
};
