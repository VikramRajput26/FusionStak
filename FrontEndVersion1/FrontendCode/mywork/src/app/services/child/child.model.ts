// src/app/child/child.model.ts

export interface ChildDTO {
    childId: number;
    firstName: string;
    lastName: string;
    bloodType: string;
    gender: 'Male' | 'Female';  // Adjusted for enum-like strings in JS
    dateOfBirth: string;  // Date as a string (ISO format)
    userId: number;
  }
  
  export interface CreateChildDTO {
    firstName: string;
    lastName: string;
    bloodType: string;
    gender: 'Male' | 'Female';  // Gender as string
    dateOfBirth: string;  // Date as a string
    userId: number;
  }
  