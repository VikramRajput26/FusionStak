// src/app/auth/sign-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignInRequest } from '../../services/auth/auth.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [ReactiveFormsModule],
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Using 'email' field for username input
      password: ['', [Validators.required]],
    });
  }

  // Method to handle form submission
  submitSignIn(): void {
    if (this.signInForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    // Creating the request object with 'username' (which is actually the email field) and password
    const signInRequest: SignInRequest = {
      username: this.signInForm.value.email,  // Using email as username
      password: this.signInForm.value.password
    };

    // Calling AuthService to perform the login action
    this.authService.signIn(signInRequest).subscribe(
      (response) => {
        // Save token to local storage and navigate to the next page
        this.authService.setToken(response.token);
        this.toastr.success('Successfully Signed In!', 'Success');
        this.router.navigate(['/childregister']);  // Redirect to child registration page
      },
      (error) => {
        // Handle login error and show message
        this.toastr.error('Login failed: ' + error.message, 'Error');
      }
    );
  }
}
