// src/app/child/child.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ChildDTO, CreateChildDTO } from './child.model';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  private apiUrl = `${environment.apiUrl}/Child`;

  constructor(private http: HttpClient) {}

  // Get all children
  getChildren(): Observable<ChildDTO[]> {
    return this.http.get<ChildDTO[]>(`${this.apiUrl}/getallchild`);
  }

  // Get a specific child by ID
  getChildById(id: number): Observable<ChildDTO> {
    return this.http.get<ChildDTO>(`${this.apiUrl}/getbyid/${id}`);
  }

  // Add a new child
  addChild(child: CreateChildDTO): Observable<ChildDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ChildDTO>(`${this.apiUrl}/addchild`, child, { headers });
  }

  // Update an existing child
  updateChild(id: number, child: ChildDTO): Observable<ChildDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<ChildDTO>(`${this.apiUrl}/update/${id}`, child, { headers });
  }

  // Delete a child
  deleteChild(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
