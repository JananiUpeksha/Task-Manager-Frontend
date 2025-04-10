/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Use your specific endpoint
  private baseUrl = 'http://localhost:5050/task/api/v1';
  
  // OR using environment variable (recommended):
  // private baseUrl = `${environment.apiUrl}/task/api/v1`;

  constructor(private http: HttpClient) { }

  // GET all tasks
  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/task`);
  }

  // GET a single task by ID
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/task/${id}`);
  }

  // POST create a new task
  createTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/task`, task);
  }

  // PUT update a task
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/task/${id}`, task);
  }

  // DELETE a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/task/${id}`);
  }
}
*/

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string | Date;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl || 'http://localhost:5050'; // Remove /task/api/v1

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task/api/v1/task`); // Full correct path
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/task/${id}`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/task/${id}`);
  }
}
  */
 // api.service.ts


 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string | Date;
  userId: number;
}

interface User {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api'; // Using proxy like in AuthService

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  // Task methods
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/v1/task`, { headers: this.getHeaders() });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/v1/task/${id}`, { headers: this.getHeaders() });
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/v1/task`, task, { headers: this.getHeaders() });
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/v1/task/${id}`, task, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/task/${id}`, { headers: this.getHeaders() });
  }

  // User methods
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/v1/user`, { headers: this.getHeaders() });
  }
}