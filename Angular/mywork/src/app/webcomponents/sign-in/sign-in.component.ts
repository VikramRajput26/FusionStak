import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Method to handle form submission
  submitSignIn(): void {
    if (this.signInForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    // On successful sign-in
    this.toastr.success('Successfully Signed In!', 'Success');
    console.log('Signed In User:', this.signInForm.value);
    this.signInForm.reset();
  }
}
