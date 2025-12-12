import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MenuItem } from '../../shared/layout.component';

@Component({
  selector: 'app-employee-dashboard',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Employee Dashboard</h2>
      <div class="grid">
        <div class="card stat">
          <div class="label">My tasks</div>
          <div class="value">12</div>
          <small>3 due soon</small>
        </div>
        <div class="card stat">
          <div class="label">Unread</div>
          <div class="value">5</div>
          <small>Notifications</small>
        </div>
        <div class="card stat">
          <div class="label">PTO balance</div>
          <div class="value">8d</div>
          <small>Remaining</small>
        </div>
      </div>

      <div class="card">
        <strong>Quick links</strong>
        <ul class="inline">
          <li><a routerLink="/employee/work">Work items</a></li>
          <li><a routerLink="/employee/profile">Profile</a></li>
          <li><a routerLink="/employee">Dashboard</a></li>
        </ul>
      </div>

      <div class="card">
        <strong>Today</strong>
        <ul>
          <li>Sync with team at 11:00</li>
          <li>Finish spec for Task #482</li>
          <li>Update profile photo</li>
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
        margin: 4px 0;
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
export class EmployeeDashboardComponent {
  menu: MenuItem[] = [
    { label: 'Dashboard', path: '/employee' },
    { label: 'Work items', path: '/employee/work' },
    { label: 'Profile', path: '/employee/profile' },
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
