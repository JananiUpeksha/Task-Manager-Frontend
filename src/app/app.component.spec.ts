/*
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent], // Add HeaderComponent to imports
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check if the header component is rendered
    expect(compiled.querySelector('app-header')).toBeTruthy();
    
    // If you want to verify specific content in the header
    const header = compiled.querySelector('app-header');
    expect(header?.textContent).toContain('Task Manager'); // Match your header content
  });
});
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent] // Only need to import AppComponent
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header');
    expect(header).toBeTruthy();
    expect(compiled.textContent).toContain('Task Manager');
  });
});
