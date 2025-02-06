import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDTO } from '../../services/auth/auth.model'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  imports :[MatTableModule,MatInputModule,MatFormFieldModule]
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email', 'userRole', 'contactNumber']; 
  dataSource = new MatTableDataSource<UserDTO>([]); 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchAllUsers(); 
  }

  
  fetchAllUsers(): void {
    this.authService.getAllUsers().subscribe(
      (users: UserDTO[]) => {
        this.dataSource.data = users; 
      },
      (error) => {
        console.error('Error fetching users:', error); 
      }
    );
  }

  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
