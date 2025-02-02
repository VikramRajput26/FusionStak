import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule

interface PostData {
  title: string;
  body: string;
  userId: number;
}

interface ApiResponse {
  id: number;
}

@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ToastrModule here
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddPostComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Ensure user ID is a number
    });
  }

  submitPost(): void {
    if (this.postForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    const postData: PostData = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId: Number(this.postForm.value.userId), // Convert to number
    };

    this.http
      .post<ApiResponse>('https://jsonplaceholder.typicode.com/posts', postData)
      .subscribe({
        next: (response: ApiResponse) => {
          this.toastr.success(
            `Post added successfully! Post ID: ${response.id}`,
            'Success'
          );
          console.log('Response:', response);
          this.postForm.reset();
        },
        error: (error: unknown) => {
          this.toastr.error('Failed to add post', 'Error');
          console.error('Error:', error);
        },
      });
  }
}
