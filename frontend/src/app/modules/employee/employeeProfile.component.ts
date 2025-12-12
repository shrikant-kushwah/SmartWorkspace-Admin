import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employee-profile',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Profile</h2>

      <div class="card profile">
        <div class="avatar">{{ initials }}</div>
        <div>
          <div class="name">{{ profile.name }}</div>
          <div class="muted">{{ profile.title }}</div>
          <div class="muted">{{ profile.email }}</div>
        </div>
      </div>

      <div class="card">
        <strong>Basics</strong>
        <ul>
          <li>Manager: {{ profile.manager }}</li>
          <li>Location: {{ profile.location }}</li>
          <li>Start date: {{ profile.start }}</li>
        </ul>
      </div>

      <div class="card">
        <strong>Skills</strong>
        <ul class="inline">
          <li *ngFor="let s of profile.skills" class="pill">{{ s }}</li>
        </ul>
      </div>
    </app-layout>
  `,
  styles: [
    `
      .profile {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #0f172a;
        color: #e2e8f0;
        display: grid;
        place-items: center;
        font-weight: 700;
      }

      .name {
        font-weight: 700;
      }

      .muted {
        color: #475569;
        font-size: 13px;
      }

      .inline {
        display: flex;
        gap: 8px;
        padding: 0;
        margin: 8px 0 0;
        list-style: none;
        flex-wrap: wrap;
      }

      .pill {
        padding: 4px 8px;
        border-radius: 999px;
        background: #e2e8f0;
        color: #0f172a;
        font-size: 12px;
      }
    `,
  ],
})
export class EmployeeProfileComponent {
  menu = [
    { label: 'Dashboard', path: '/employee' },
    { label: 'Work items', path: '/employee/work' },
    { label: 'Profile', path: '/employee/profile' },
  ];

  profile = {
    name: 'Alex Kim',
    title: 'Product Engineer',
    email: 'alex@demo.local',
    manager: 'Jordan',
    location: 'Remote',
    start: 'Oct 2023',
    skills: ['Angular', 'Node', 'UX'],
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get initials() {
    return this.profile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
