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