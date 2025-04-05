export interface AuthUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string,
  refreshToken: string, 
  loginSucceeded: boolean;
}