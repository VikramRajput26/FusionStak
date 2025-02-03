import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../auth/auth.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],  
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      userRole: ['USER', Validators.required],  // Correct field for backend
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to match passwords
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Method to handle form submission
  submitSignUp(): void {
    if (this.signUpForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    const signUpRequest: SignUpRequest = this.signUpForm.value;

    // Call AuthService signUp method
    this.authService.signUp(signUpRequest).subscribe(
      (response) => {
        this.toastr.success('Successfully Registered!', 'Success');
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      },
      (error) => {
        this.toastr.error('Registration failed: ' + error.message, 'Error');
      }
    );
  }
}
