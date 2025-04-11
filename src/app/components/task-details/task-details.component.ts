// task-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  // Task data
  allTasks: any[] = [];
  filteredTasks: any[] = [];
  
  // Filter controls
  selectedStatus: string = 'All';
  statusOptions: string[] = ['All', 'Pending', 'In Progress', 'Completed'];
  
  // State management
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';
    
    this.apiService.getAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.filterTasks();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        console.error(err);
        this.loading = false;
      }
    });
  }

  filterTasks(): void {
    if (this.selectedStatus === 'All') {
      this.filteredTasks = [...this.allTasks];
    } else {
      this.filteredTasks = this.allTasks.filter(task => 
        task.status === this.selectedStatus
      );
    }
  }

  onStatusChange(): void {
    this.filterTasks();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'badge bg-warning';
      case 'In Progress': return 'badge bg-info';
      case 'Completed': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  trackByTaskId(index: number, task: any): number {
    return task.id;
  }
}