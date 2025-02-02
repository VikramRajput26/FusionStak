import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deletepost.component.html',
  styleUrls: ['./deletepost.component.css'],
})
export class DeletePostComponent {
  deletePostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.deletePostForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  deletePost(): void {
    if (this.deletePostForm.invalid) {
      this.toastr.error('Please enter a valid Post ID!', 'Error');
      return;
    }

    const postId = this.deletePostForm.value.id;

    // Send DELETE request to delete the post by ID
    this.http
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .subscribe({
        next: () => {
          this.toastr.success('Post deleted successfully!', 'Success');
          this.router.navigate(['/posts']); // Redirect to posts page after deletion
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Failed to delete post', 'Error');
          console.error('Error:', error);
        },
      });
  }
}
