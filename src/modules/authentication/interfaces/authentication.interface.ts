export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface AuthGithubPayload {
  [key: string]: string;
  code: string;
}

export interface AuthGooglePayload {
  [key: string]: string;
  code: string;
}
