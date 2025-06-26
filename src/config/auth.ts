export interface AuthConfig {
  email: string;
  password: string;
  tokenExpirationTime: number;
  maxLoginAttempts: number;
}

export const authConfig: AuthConfig = {
  email: 'vitor@app.com',
  password: 'vitor123',
  tokenExpirationTime: 3600000, // 1 hour in milliseconds
  maxLoginAttempts: 3,
};