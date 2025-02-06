import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChildService } from '../../services/child/child.service';
import { CreateChildDTO } from '../../services/child/child.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; // Import AuthService
import { MatFormFieldModule } from '@angular/material/form-field';  // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-childregister',
  templateUrl: './childregister.component.html',
  styleUrls: ['./childregister.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,  // Ensure MatFormFieldModule is imported
    MatInputModule,      // Ensure MatInputModule is imported
    MatSelectModule,     // Ensure MatSelectModule is imported     
    MatDatepickerModule,
  ],
})
export class ChildregisterComponent implements OnInit {
  childRegisterForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private childService: ChildService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {
    this.childRegisterForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      bloodType: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });
  }

  // OnInit lifecycle hook to get the userId from the token
  ngOnInit(): void {
    this.getUserIdFromToken();
  }

  // Function to extract userId from the token
  getUserIdFromToken(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token (assuming it's a JWT token)
      this.userId = decodedToken?.userId || null;
      this.childRegisterForm.patchValue({ userId: this.userId });
    } else {
      this.toastr.error('Token not found or expired', 'Error');
    }
  }

  // Submit the form
  submitChildRegister(): void {
    if (this.childRegisterForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    const newChild: CreateChildDTO = {
      firstName: this.childRegisterForm.value.firstName,
      lastName: this.childRegisterForm.value.lastName,
      bloodType: this.childRegisterForm.value.bloodType,
      gender: this.childRegisterForm.value.gender,
      dateOfBirth: this.childRegisterForm.value.dateOfBirth,
      userId: this.childRegisterForm.value.userId, // Automatically set the userId
    };

    // Calling the service to add the new child
    this.childService.addChild(newChild).subscribe(
      (response) => {
        this.toastr.success('Child registered successfully!', 'Success');
        this.router.navigate(['/appointment']); // Redirect after success
      },
      (error) => {
        this.toastr.error('Registration failed: ' + error.message, 'Error');
      }
    );
  }
}
