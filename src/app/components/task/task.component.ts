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

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // Form fields
  selectedTaskId: string | null = null;
  title: string = '';
  description: string = '';
  status: string = 'Pending';
  createdAt: Date = new Date();
  userId: number = 1; // You'll need to get this from your auth system

  // Task list
  tasks: any[] = [];

  // State management
  loading: boolean = false;
  error: string = '';
  action: 'create' | 'update' | 'delete' | '' = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAllTasks();
  }

  // Load all tasks from API
  loadAllTasks(): void {
    this.loading = true;
    this.apiService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.error = 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  // Load selected task details
  loadTask(): void {
    if (!this.selectedTaskId) return;
    
    this.loading = true;
    const taskId = Number(this.selectedTaskId);
    this.apiService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.createdAt = task.createdAt ? new Date(task.createdAt) : new Date();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.error = 'Failed to load task details';
        this.loading = false;
      }
    });
  }

  // Update existing task
  updateTask(): void {
    if (!this.selectedTaskId || !this.title) {
      this.error = 'Please select a task and add a title!';
      return;
    }

    this.loading = true;
    this.action = 'update';
    const taskData = {
      id: Number(this.selectedTaskId),
      title: this.title,
      description: this.description,
      status: this.status,
      userId: this.userId
    };

    this.apiService.updateTask(Number(this.selectedTaskId), taskData).subscribe({
      next: () => {
        this.error = '';
        this.loading = false;
        this.action = '';
        this.loadAllTasks();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.error = 'Failed to update task';
        this.loading = false;
        this.action = '';
      }
    });
  }

  // Submit new task
  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.title) {
      this.error = 'Title is required!';
      return;
    }

    this.loading = true;
    this.action = 'create';
    const newTask = {
      title: this.title,
      description: this.description,
      status: this.status,
      userId: this.userId
    };

    this.apiService.createTask(newTask).subscribe({
      next: () => {
        this.error = '';
        this.loading = false;
        this.action = '';
        this.resetForm();
        this.loadAllTasks();
      },
      error: (err) => {
        console.error('Error creating task:', err);
        this.error = 'Failed to create task';
        this.loading = false;
        this.action = '';
      }
    });
  }

  // Delete task
  deleteTask(): void {
    if (!this.selectedTaskId) return;
    
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.loading = true;
    this.action = 'delete';
    this.apiService.deleteTask(Number(this.selectedTaskId)).subscribe({
      next: () => {
        this.error = '';
        this.loading = false;
        this.action = '';
        this.resetForm();
        this.loadAllTasks();
      },
      error: (err) => {
        console.error('Error deleting task:', err);
        this.error = 'Failed to delete task';
        this.loading = false;
        this.action = '';
      }
    });
  }

  // Helper methods
  selectTask(taskId: string): void {
    this.selectedTaskId = taskId;
    this.loadTask();
  }

  resetForm(): void {
    this.selectedTaskId = null;
    this.title = '';
    this.description = '';
    this.status = 'Pending';
    this.createdAt = new Date();
    this.error = '';
  }

  clearError(): void {
    this.error = '';
  }
}