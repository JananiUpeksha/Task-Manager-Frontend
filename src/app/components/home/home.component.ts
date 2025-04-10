// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks = [
    { id: 1, title: 'Complete Angular project', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Review pull requests', status: 'Pending', priority: 'Medium' },
    { id: 3, title: 'Update documentation', status: 'Completed', priority: 'Low' }
  ];
}