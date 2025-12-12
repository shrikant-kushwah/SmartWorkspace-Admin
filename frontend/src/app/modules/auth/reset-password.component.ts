import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  template: `
    <div class="login-shell">
      <div class="login-card">
        <h2>Reset password</h2>

        <form #form="ngForm" (ngSubmit)="submit(form)">
          <input
            name="token"
            [(ngModel)]="token"
            #tokenCtrl="ngModel"
            type="text"
            placeholder="Reset token"
            required
          />
          <small class="hint" *ngIf="tokenCtrl.invalid && tokenCtrl.touched">
            Reset token is required.
          </small>

          <input
            name="password"
            [(ngModel)]="password"
            #pwdCtrl="ngModel"
            type="password"
            placeholder="New password (min 6 chars)"
            minlength="6"
            required
          />
          <small class="hint" *ngIf="pwdCtrl.invalid && pwdCtrl.touched">
            Minimum 6 characters required.
          </small>

          <button type="submit" [disabled]="form.invalid || loading">
            {{ loading ? 'Updating…' : 'Reset' }}
          </button>
        </form>

        <p class="card success" *ngIf="message">{{ message }}</p>
        <p class="card error" *ngIf="error">{{ error }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .login-shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        padding: 16px;
      }
      .login-card {
        background: #fff;
        width: 100%;
        max-width: 360px;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
      }
      h2 {
        margin: 0 0 12px;
        text-align: center;
        color: #0f172a;
        font-weight: 600;
      }
      form {
        display: grid;
        gap: 12px;
      }
      input {
        padding: 12px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 14px;
      }
      .hint {
        font-size: 12px;
        color: #b91c1c;
        margin: -6px 0 0;
      }
      button {
        width: 100%;
        cursor: pointer;
      }
      .success {
        margin-top: 12px;
        color: #166534;
        background: #ecfdf3;
        padding: 8px 10px;
        border-radius: 6px;
      }
      .error {
        margin-top: 12px;
        color: #b91c1c;
        background: #fef2f2;
        padding: 8px 10px;
        border-radius: 6px;
      }
    `,
  ],
})
export class ResetPasswordComponent {
  token = '';
  password = '';
  message = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // auto fill token from query param if present
    const paramToken = this.route.snapshot.queryParamMap.get('token');
    if (paramToken) this.token = paramToken;
  }

  submit(form: any) {
    if (form.invalid) return;

    this.message = '';
    this.error = '';
    this.loading = true;

    const cleanToken = this.token.trim();

    this.auth.resetPassword(cleanToken, this.password).subscribe({
      next: () => {
        this.message = 'Password updated. You can now log in.';
        this.loading = false;

        // quick redirect after a moment
        setTimeout(() => this.router.navigate(['/auth/login']), 1200);
      },
      error: (err) => {
        this.error = err.error?.error || 'Unable to reset password.';
        this.loading = false;
      },
    });
  }
}
