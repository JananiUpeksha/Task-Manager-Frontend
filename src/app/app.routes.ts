import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './components/task/task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

/*
export const routes: Routes = [
  // Make login the first route
  { 
    path: 'login', 
    component: LoginComponent,
    data: { title: 'Login' } 
  },
  // Public routes (without layout)
  { 
    path: 'signup', 
    component: SignupComponent,
    data: { title: 'Create Account' } 
  },
  // Protected routes (with layout)
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'taskDetails', component: TaskDetailsComponent },
      { path: 'taskDetails/:id', component: TaskDetailsComponent }
    ]
  },
  // Redirect rules
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];
*/
export const routes: Routes = [
  // Public routes (outside layout)
  { 
    path: 'login', 
    component: LoginComponent,
    data: { title: 'Login' } 
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    data: { title: 'Create Account' } 
  },
  
  // Protected routes (inside layout)
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'taskDetails', component: TaskDetailsComponent },
      { path: 'taskDetails/:id', component: TaskDetailsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  
  // Redirect rules
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];