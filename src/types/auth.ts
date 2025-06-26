export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginAttempts: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface LoginError {
  message: string;
  code: 'INVALID_CREDENTIALS' | 'MAX_ATTEMPTS_EXCEEDED' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';
  attempts?: number;
}

export type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponse }
  | { type: 'LOGIN_FAILURE'; payload: LoginError }
  | { type: 'LOGOUT' }
  | { type: 'RESET_ERROR' }
  | { type: 'INCREMENT_ATTEMPTS' };