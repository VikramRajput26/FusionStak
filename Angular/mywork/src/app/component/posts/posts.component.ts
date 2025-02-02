import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class PostsComponent implements AfterViewInit {
  private http = inject(HttpClient);

  displayedColumns: string[] = ['id', 'title', 'body'];
  dataSource = new MatTableDataSource<Post>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngAfterViewInit() {
    // Ensure paginator is initialized after view is ready
    this.dataSource.paginator = this.paginator;
    this.fetchPosts();
  }

  fetchPosts() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data: Post[]) => {
        // Set the fetched data to dataSource
        this.dataSource.data = data;

        // Ensure paginator is still linked to the dataSource after data is loaded
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      });
  }
}
