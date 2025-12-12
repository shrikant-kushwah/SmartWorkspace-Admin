import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-manager-tasks',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Tasks</h2>
      <div class="card">
        <strong>Team tasks</strong>
        <table class="list">
          <thead>
            <tr>
              <th>Title</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of tasks">
              <td>{{ t.title }}</td>
              <td>{{ t.owner }}</td>
              <td>
                <span
                  class="pill"
                  [class.green]="t.status === 'In Progress'"
                  [class.amber]="t.status === 'Blocked'"
                  >{{ t.status }}</span
                >
              </td>
              <td>{{ t.due }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <strong>Upcoming</strong>
        <ul>
          <li>Retro on Friday</li>
          <li>Prep release checklist</li>
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
      .pill {
        padding: 4px 8px;
        border-radius: 999px;
        font-size: 12px;
        background: #e2e8f0;
        color: #0f172a;
      }
      .pill.green {
        background: #dcfce7;
        color: #166534;
      }
      .pill.amber {
        background: #fef3c7;
        color: #92400e;
      }
    `,
  ],
})
export class ManagerTasksComponent {
  menu = [
    { label: 'Dashboard', path: '/manager' },
    { label: 'Team', path: '/manager/team' },
    { label: 'Tasks', path: '/manager/tasks' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  tasks = [
    {
      title: 'API migration',
      owner: 'Jordan',
      status: 'In Progress',
      due: 'Feb 14',
    },
    { title: 'UI polish', owner: 'Taylor', status: 'Blocked', due: 'Feb 10' },
    {
      title: 'Regression suite',
      owner: 'Casey',
      status: 'In Progress',
      due: 'Feb 12',
    },
  ];

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
