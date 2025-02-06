import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChildService } from '../../services/child/child.service'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChildDTO } from '../../services/child/child.model'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginator
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.css'],
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatPaginatorModule] // Add MatPaginatorModule here
})
export class ChildTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['childId', 'firstName', 'lastName', 'bloodType', 'gender', 'dateOfBirth', 'userId']; 
  dataSource = new MatTableDataSource<ChildDTO>([]); 

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference for paginator

  constructor(private childService: ChildService) {}

  ngOnInit(): void {
    this.fetchAllChildren(); 
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Link the paginator with the data source
  }

  // Fetch all children from the service
  fetchAllChildren(): void {
    this.childService.getChildren().subscribe(
      (children: ChildDTO[]) => {
        this.dataSource.data = children;
      },
      (error) => {
        console.error('Error fetching children:', error); 
      }
    );
  }

  // Apply the filter to the table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
