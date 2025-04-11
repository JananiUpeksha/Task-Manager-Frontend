import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  // Form control properties
  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { confirmPassword, ...userData } = this.signupForm.value;

    this.authService.signup(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Auto-login after successful signup
        this.authService.login(userData.username, userData.password).subscribe({
          next: () => this.router.navigate(['/home']),
          error: (loginError) => {
            console.error('Auto-login failed:', loginError);
            this.router.navigate(['/login']);
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 
          'Signup failed. Please try again.';
        console.error('Signup error:', error);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}