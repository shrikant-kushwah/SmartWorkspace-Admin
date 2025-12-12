import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MenuItem } from '../../shared/layout.component';

@Component({
  selector: 'app-manager-dashboard',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Manager Dashboard</h2>
      <div class="grid">
        <div class="card stat">
          <div class="label">People</div>
          <div class="value">24</div>
          <small>3 on leave</small>
        </div>
        <div class="card stat">
          <div class="label">Active tasks</div>
          <div class="value">58</div>
          <small>12 due this week</small>
        </div>
        <div class="card stat">
          <div class="label">Approvals</div>
          <div class="value">4</div>
          <small>Needs review</small>
        </div>
      </div>

      <div class="card">
        <strong>Quick links</strong>
        <ul class="inline">
          <li><a routerLink="/manager/team">Team</a></li>
          <li><a routerLink="/manager/tasks">Tasks</a></li>
          <li><a routerLink="/manager/tasks">Reports</a></li>
        </ul>
      </div>

      <div class="card">
        <strong>Upcoming</strong>
        <ul>
          <li>1:1s Friday 2pm</li>
          <li>Release cut on Wednesday</li>
          <li>Planning on Monday</li>
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
export class ManagerDashboardComponent {
  menu: MenuItem[] = [
    { label: 'Dashboard', path: '/manager' },
    { label: 'Team', path: '/manager/team' },
    { label: 'Tasks', path: '/manager/tasks' },
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
