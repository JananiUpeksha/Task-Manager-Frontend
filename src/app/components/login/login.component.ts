import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    this.router.navigate(['/app/home'])
      .then(success => {
        if (!success) {
          console.error('Navigation failed! Check your routes.');
        }
      })
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}