import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['USER', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
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

    // On successful registration
    this.toastr.success('Successfully Registered!', 'Success');
    console.log('Registered User:', this.signUpForm.value);
    this.signUpForm.reset();
  }
}
