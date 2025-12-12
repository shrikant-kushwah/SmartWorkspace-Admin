import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LayoutComponent, MenuItem } from '../../shared/layout.component';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Admin Dashboard</h2>

      <div class="grid">
        <div class="card stat">
          <div class="label">Active users</div>
          <div class="value">142</div>
          <small>+12 this week</small>
        </div>

        <div class="card stat">
          <div class="label">Open projects</div>
          <div class="value">18</div>
          <small>5 need review</small>
        </div>

        <div class="card stat">
          <div class="label">Pending invites</div>
          <div class="value">7</div>
          <small>Action required</small>
        </div>
      </div>

      <div class="card">
        <strong>Quick links</strong>
        <ul class="inline">
          <li><a routerLink="/admin/users">Manage users</a></li>
          <li><a routerLink="/admin/projects">Projects board</a></li>
          <li><a routerLink="/admin/analytics">Analytics</a></li>
        </ul>
      </div>

      <div class="card">
        <strong>Recent activity</strong>
        <ul>
          <li>Jane promoted to Manager</li>
          <li>Project Alpha moved to QA</li>
          <li>New employee onboarded: Alex</li>
        </ul>
      </div>
    </app-layout>
  `,
  styles: [
    `
      .grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        margin-bottom: 12px;
      }

      .stat .label {
        color: #475569;
        font-size: 13px;
      }

      .stat .value {
        font-size: 26px;
        font-weight: 700;
        margin: 4px 0 6px;
      }

      .inline {
        display: flex;
        gap: 12px;
        padding: 0;
        margin: 8px 0 0;
        list-style: none;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class AdminDashboardComponent {
  menu: MenuItem[] = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Projects', path: '/admin/projects' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
