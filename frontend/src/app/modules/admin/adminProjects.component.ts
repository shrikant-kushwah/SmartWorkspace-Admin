import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-projects',
  template: `
    <app-layout [menu]="menu" (logout)="logout()">
      <h2>Projects</h2>

      <div class="card">
        <strong>Portfolio</strong>

        <table class="list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Due</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let p of projects">
              <td>{{ p.name }}</td>
              <td>
                <span
                  class="pill"
                  [class.green]="p.status === 'On Track'"
                  [class.amber]="p.status === 'At Risk'"
                  [class.gray]="p.status === 'Paused'"
                >
                  {{ p.status }}
                </span>
              </td>
              <td>{{ p.owner }}</td>
              <td>{{ p.due }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <strong>Notes</strong>
        <ul>
          <li>Alpha blocking QA on API tests</li>
          <li>Beta needs design sign-off</li>
          <li>Gamma paused awaiting funding</li>
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
export class AdminProjectsComponent {
  menu = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Projects', path: '/admin/projects' },
  ];

  projects = [
    { name: 'Project Alpha', status: 'At Risk', owner: 'Sam', due: 'Feb 12' },
    { name: 'Project Beta', status: 'On Track', owner: 'Jane', due: 'Mar 01' },
    { name: 'Project Gamma', status: 'Paused', owner: 'Alex', due: '—' },
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
