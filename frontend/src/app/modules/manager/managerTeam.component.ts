import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-manager-team',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Team</h2>
      <div class="card">
        <strong>Roster</strong>
        <table class="list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Load</th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let member of team">
              <td>{{ member.name }}</td>
              <td>{{ member.role }}</td>
              <td>{{ member.load }}%</td>
              <td>{{ member.next }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <strong>Needs attention</strong>
        <ul>
          <li>Backfill for PTO next week</li>
          <li>Pair support on API migration</li>
        </ul>
      </div>
    </app-layout>
  `,
  styles: [
    `
      table.list {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }
      table.list th,
      table.list td {
        padding: 10px;
        border-bottom: 1px solid #e2e8f0;
        text-align: left;
      }
      table.list th {
        background: #f8fafc;
        color: #475569;
        font-weight: 600;
      }
    `,
  ],
})
export class ManagerTeamComponent {
  menu = [
    { label: 'Dashboard', path: '/manager' },
    { label: 'Team', path: '/manager/team' },
    { label: 'Tasks', path: '/manager/tasks' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  team = [
    { name: 'Taylor', role: 'FE', load: 70, next: 'UI polish' },
    { name: 'Jordan', role: 'BE', load: 85, next: 'API migration' },
    { name: 'Casey', role: 'QA', load: 55, next: 'Regression run' },
  ];

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
