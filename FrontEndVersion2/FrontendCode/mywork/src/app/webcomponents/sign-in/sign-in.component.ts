import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignInRequest } from '../../services/auth/auth.model';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [ CommonModule,  ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
})
export class SignInComponent {
  signInForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hide: boolean = true;  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
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
