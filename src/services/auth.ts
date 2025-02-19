// src/services/authService.ts
export const TOKEN_KEY = 'access_token';

// ✅ 토큰 저장 (localStorage 또는 sessionStorage)
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// ✅ 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ✅ 토큰 삭제 (로그아웃)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ✅ 사용자 인증 여부 확인
export const isAuthenticated = () => {
  return !!getToken();
};
