import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employee-work',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Work items</h2>

      <div class="card">
        <strong>My tasks</strong>

        <table class="list">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Due</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let t of tasks">
              <td>{{ t.title }}</td>
              <td>
                <span
                  class="pill"
                  [class.green]="t.status === 'In Progress'"
                  [class.amber]="t.status === 'Blocked'"
                  [class.gray]="t.status === 'Todo'"
                >
                  {{ t.status }}
                </span>
              </td>
              <td>{{ t.due }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <strong>Reminders</strong>
        <ul>
          <li>Standup at 10:00</li>
          <li>Push updates before EOD</li>
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

      .pill.gray {
        background: #e2e8f0;
        color: #334155;
      }
    `,
  ],
})
export class EmployeeWorkComponent {
  menu = [
    { label: 'Dashboard', path: '/employee' },
    { label: 'Work items', path: '/employee/work' },
    { label: 'Profile', path: '/employee/profile' },
  ];

  tasks = [
    { title: 'Spec updates', status: 'In Progress', due: 'Today' },
    { title: 'QA handoff', status: 'Todo', due: 'Tomorrow' },
    { title: 'Fix login bug', status: 'Blocked', due: 'Feb 15' },
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
