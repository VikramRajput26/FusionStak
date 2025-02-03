// src/app/auth/sign-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignInRequest } from '../../auth/auth.model';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Method to handle form submission
  submitSignIn(): void {
    if (this.signInForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    const signInRequest: SignInRequest = this.signInForm.value;

    // Call AuthService signIn method
    this.authService.signIn(signInRequest).subscribe(
      (response) => {
        this.authService.setToken(response.token); // Save token to local storage
        this.toastr.success('Successfully Signed In!', 'Success');
        this.router.navigate(['/dashboard']); // Redirect to dashboard after successful login
      },
      (error) => {
        this.toastr.error('Login failed: ' + error.message, 'Error');
      }
    );
  }
}
