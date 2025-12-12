import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-users',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Users</h2>

      <div class="card">
        <strong>Directory</strong>

        <table class="list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let u of users">
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.role }}</td>
              <td>
                <span
                  class="pill"
                  [class.green]="u.active"
                  [class.gray]="!u.active"
                >
                  {{ u.active ? 'Active' : 'Invited' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <strong>Actions</strong>
        <ul class="inline">
          <li><button class="secondary">Invite</button></li>
          <li><button class="secondary">Export CSV</button></li>
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

      .pill.gray {
        background: #e2e8f0;
        color: #334155;
      }

      .inline {
        display: flex;
        gap: 8px;
        padding: 0;
        margin: 8px 0 0;
        list-style: none;
      }
    `,
  ],
})
export class AdminUsersComponent {
  menu = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Projects', path: '/admin/projects' },
  ];

  users = [
    { name: 'Jane Doe', email: 'jane@demo.local', role: 'admin', active: true },
    {
      name: 'Sam Patel',
      email: 'sam@demo.local',
      role: 'manager',
      active: true,
    },
    {
      name: 'Alex Kim',
      email: 'alex@demo.local',
      role: 'employee',
      active: false,
    },
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
