const ACCESS_TOKEN_NAME = "accessToken";
const REFRESH_TOKEN_NAME = "refreshToken";

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_NAME, token);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_NAME);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_NAME);
}

export function setRefreshToken(token) {
  localStorage.setItem(REFRESH_TOKEN_NAME, token);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_NAME);
}

export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_NAME);
}
