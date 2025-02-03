import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css'],
})
export class UpdatePostComponent {
  updatePostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.updatePostForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Method to handle form submission
  submitPost(): void {
    if (this.updatePostForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    const postData: PostData = {
      id: this.updatePostForm.value.id,
      title: this.updatePostForm.value.title,
      body: this.updatePostForm.value.body,
      userId: Number(this.updatePostForm.value.userId),
    };

    // Sending PUT request to update the post
    this.http
      .put<PostData>(
        `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
        postData
      )
      .subscribe({
        next: (response: PostData) => {
          // On success, show success toast message
          this.toastr.success('Successfully updated post!', 'Success');
          console.log('Updated Post:', response);
          this.updatePostForm.reset();
        },
        error: (error: unknown) => {
          // On error, show error toast message
          this.toastr.error('Failed to update post', 'Error');
          console.error('Error:', error);
        },
      });
  }
}
