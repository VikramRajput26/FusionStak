// src/app/auth/auth.model.ts

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userRole: string;
    contactNumber: string;
  }
  
  export interface SignInRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    userId: number;
  }
  