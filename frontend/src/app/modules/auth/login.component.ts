import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-shell">
      <div class="login-card">
        <h2>Sign in</h2>

        <form (ngSubmit)="submit()">
          <input
            name="email"
            [(ngModel)]="email"
            type="email"
            placeholder="Email"
            required
          />
          <p class="card error inline-error" *ngIf="emailInvalid">
            Please enter a valid email.
          </p>

          <input
            name="password"
            [(ngModel)]="password"
            type="password"
            placeholder="Password"
            required
          />
          <p class="card error inline-error" *ngIf="passwordInvalid">
            Please enter a valid password.
          </p>

          <button type="submit">Login</button>
        </form>

        <div class="links">
          <a routerLink="/auth/forgot">Forgot password?</a>
        </div>

        <p class="card success" *ngIf="success">{{ success }}</p>
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
        padding: 11px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 14px;
      }

      button {
        width: 100%;
        cursor: pointer;
      }

      .links {
        margin-top: 8px;
        text-align: right;
        font-size: 13px;
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
        border: none;
      }

      .success {
        margin-top: 12px;
        background: #ecfdf3;
        color: #166534;
        padding: 8px 10px;
        border-radius: 6px;
      }
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';

  error = '';
  success = '';

  emailInvalid = false;
  passwordInvalid = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    this.error = '';
    this.success = '';
    this.emailInvalid = false;
    this.passwordInvalid = false;

    const emailValue = this.email.trim();
    const passwordValue = this.password.trim();

    // basic front-end validation
    if (!this.isValidEmail(emailValue)) {
      this.emailInvalid = true;
      this.error = 'Please enter a valid email.';
      return;
    }

    if (!this.isValidPassword(passwordValue)) {
      this.passwordInvalid = true;
      this.error = 'Please enter a valid password.';
      return;
    }

    this.auth.login({ email: emailValue, password: passwordValue }).subscribe({
      next: (res) => {
        this.success = 'Login successful. Redirecting...';

        const role = res.user?.role;
        let redirect = '/employee';

        if (role === 'admin') redirect = '/admin';
        else if (role === 'manager') redirect = '/manager';

        this.router.navigate([redirect]);
      },
      error: (err) => {
        this.error =
          err?.error?.error ||
          'Login failed. Please check your email or password.';
      },
    });
  }

  private isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPassword(password: string) {
    return password.length >= 6;
  }
}
