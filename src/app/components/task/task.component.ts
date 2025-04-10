/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  // Form fields
  selectedTaskId: string = '';
  title: string = '';
  description: string = '';
  status: string = 'Pending';
  createdAt: Date = new Date();

  // Sample tasks
  tasks: any[] = [
    { id: '1', title: 'Implement authentication', description: 'Create login system', status: 'Completed', createdAt: new Date('2023-05-15') },
    { id: '2', title: 'Design dashboard', description: 'Create admin panel UI', status: 'In Progress', createdAt: new Date('2023-05-20') }
  ];

  // Load selected task
  loadTask() {
    if (!this.selectedTaskId) return;
    const task = this.tasks.find(t => t.id === this.selectedTaskId);
    if (task) {
      this.title = task.title;
      this.description = task.description;
      this.status = task.status;
      this.createdAt = task.createdAt;
    }
  }

  // Update existing task
  updateTask() {
    if (!this.selectedTaskId || !this.title) {
      alert('Please select a task and add a title!');
      return;
    }
    
    const index = this.tasks.findIndex(t => t.id === this.selectedTaskId);
    if (index !== -1) {
      this.tasks[index] = {
        id: this.selectedTaskId,
        title: this.title,
        description: this.description,
        status: this.status,
        createdAt: this.createdAt
      };
      alert('Task updated successfully!');
    }
  }

  // Submit new task
  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.title) {
      alert('Title is required!');
      return;
    }

    this.tasks.push({
      id: this.generateId(),
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: new Date()
    });
    
    this.resetForm();
    alert('New task saved!');
  }

  // Delete task
  deleteTask() {
    if (!this.selectedTaskId) return;
    this.tasks = this.tasks.filter(task => task.id !== this.selectedTaskId);
    this.resetForm();
  }

  // Helper methods
  selectTask(taskId: string) {
    this.selectedTaskId = taskId;
    this.loadTask();
  }

  resetForm() {
    this.selectedTaskId = '';
    this.title = '';
    this.description = '';
    this.status = 'Pending';
    this.createdAt = new Date();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // Form fields
  selectedTaskId: number | null = null;
  title: string = '';
  description: string = '';
  status: string = 'Pending';
  userId: number | null = null;
  createdAt: Date = new Date();

  // Lists
  tasks: any[] = [];
  users: any[] = [];

  // State management
  loading: boolean = false;
  error: string = '';
  action: 'create' | 'update' | 'delete' | '' = '';
  successMessage: string = ''; // NEW: Added for success notifications

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAllTasks();
    this.loadAllUsers();
  }

  loadAllTasks(): void {
    this.loading = true;
    this.apiService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.handleError('Failed to load tasks', err);
      }
    });
  }

  loadAllUsers(): void {
    this.apiService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        if (this.users.length > 0 && !this.userId) {
          this.userId = this.users[0].id;
        }
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  loadTask(): void {
    if (!this.selectedTaskId) return;
    
    this.loading = true;
    this.apiService.getTaskById(this.selectedTaskId).subscribe({
      next: (task) => {
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.userId = task.userId;
        this.createdAt = task.createdAt ? new Date(task.createdAt) : new Date();
        this.loading = false;
      },
      error: (err) => {
        this.handleError('Failed to load task details', err);
      }
    });
  }

  updateTask(): void {
    if (!this.selectedTaskId || !this.title || !this.userId) {
      this.error = 'Please select a task and fill all required fields!';
      return;
    }

    const taskData = {
      id: this.selectedTaskId,
      title: this.title,
      description: this.description,
      status: this.status,
      userId: this.userId
    };

    this.executeAction('update', () => 
      this.apiService.updateTask(this.selectedTaskId!, taskData)
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.title || !this.userId) {
      this.error = 'Title and user are required!';
      return;
    }

    const newTask = {
      title: this.title,
      description: this.description,
      status: this.status,
      userId: this.userId
    };

    this.executeAction('create', () => 
      this.apiService.createTask(newTask)
    );
  }

  deleteTask(): void {
    if (!this.selectedTaskId) return;
    
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.executeAction('delete', () => 
      this.apiService.deleteTask(this.selectedTaskId!)
    );
  }

  selectTask(taskId: number): void {
    this.selectedTaskId = taskId;
    this.loadTask();
  }

  resetForm(): void {
    this.selectedTaskId = null;
    this.title = '';
    this.description = '';
    this.status = 'Pending';
    this.userId = this.users.length > 0 ? this.users[0].id : null;
    this.createdAt = new Date();
    this.error = '';
    this.successMessage = ''; // NEW: Clear success message on reset
  }

  getUserById(userId: number): any {
    return this.users.find(user => user.id === userId);
  }

  // UPDATED: Optimized executeAction method
  private executeAction(
    action: 'create' | 'update' | 'delete',
    serviceCall: () => Observable<any>
  ): void {
    this.loading = true;
    this.action = action;
    this.error = '';
    this.successMessage = '';

    serviceCall().subscribe({
      next: (updatedTask) => {
        // Optimized local updates instead of full reload
        if (action === 'create') {
          this.tasks = [...this.tasks, updatedTask];
        } else if (action === 'update') {
          this.tasks = this.tasks.map(t => 
            t.id === updatedTask.id ? updatedTask : t
          );
        } else if (action === 'delete') {
          this.tasks = this.tasks.filter(t => t.id !== this.selectedTaskId);
        }

        this.successMessage = `Task ${action}d successfully!`; // NEW: Success feedback
        setTimeout(() => this.successMessage = '', 3000); // NEW: Auto-hide message
        
        if (action !== 'delete') {
          this.resetForm();
        }
      },
      error: (err) => {
        this.handleError(`Failed to ${action} task`, err);
      },
      complete: () => {
        this.loading = false;
        this.action = '';
      }
    });
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.error = message;
    if (error.error?.message) {
      this.error += `: ${error.error.message}`;
    }
    this.loading = false;
    this.action = '';
  }
  
  // NEW: Added trackBy function for efficient rendering
  trackByTaskId(index: number, task: any): number {
    return task.id;
  }
}