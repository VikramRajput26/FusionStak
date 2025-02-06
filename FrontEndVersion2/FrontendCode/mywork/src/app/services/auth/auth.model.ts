export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: 'USER' | 'ADMIN';
  contactNumber: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}