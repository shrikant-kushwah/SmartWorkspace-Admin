import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="login-shell">
      <div class="login-card">
        <h2>Forgot password</h2>

        <form #form="ngForm" (ngSubmit)="submit(form)">
          <input
            name="email"
            [(ngModel)]="email"
            #emailCtrl="ngModel"
            type="email"
            placeholder="Email"
            required
            email
            [class.has-error]="showError(emailCtrl)"
          />

          <p
            class="card error inline-error"
            *ngIf="showError(emailCtrl)"
            role="alert"
          >
            {{ getEmailError(emailCtrl) }}
          </p>

          <button type="submit" [disabled]="loading">
            {{ loading ? 'Sending…' : 'Send reset link' }}
          </button>
          <button type="button" class="secondary" routerLink="/auth/login">
            Back to login
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

      button {
        width: 100%;
        cursor: pointer;
      }

      .success {
        margin-top: 12px;
        background: #ecfdf3;
        color: #166534;
        padding: 8px 10px;
        border-radius: 6px;
      }

      .error {
        margin-top: 12px;
        background: #fef2f2;
        color: #b91c1c;
        padding: 8px 10px;
        border-radius: 6px;
      }

      .inline-error {
        margin-top: 4px;
        padding: 0;
        background: none;
        font-size: 13px;
      }

      .has-error {
        border-color: #ef4444;
        box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.25);
      }
    `,
  ],
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  error = '';
  loading = false;
  submitted = false;

  constructor(private auth: AuthService) {}

  submit(form: any) {
    this.submitted = true;

    if (form.invalid) return;

    this.error = '';
    this.message = '';
    this.loading = true;

    const emailValue = this.email.trim();

    this.auth.requestPasswordReset(emailValue).subscribe({
      next: () => {
        this.message =
          'Check your inbox for the reset link (valid for 15 minutes).';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Unable to process request.';
        this.loading = false;
      },
    });
  }

  showError(ctrl: any): boolean {
    return ctrl?.invalid && (ctrl.touched || ctrl.dirty || this.submitted);
  }

  getEmailError(ctrl: any): string {
    const errors = ctrl?.errors;
    if (!errors) return '';
    if (errors['required']) return 'Email is required.';
    if (errors['email']) return 'Please enter a valid email.';
    return 'Invalid email.';
  }
}
