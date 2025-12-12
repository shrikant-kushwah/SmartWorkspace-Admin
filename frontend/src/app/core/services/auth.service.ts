import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiBase}/auth`;

  // keep track of logged-in user
  private userSub = new BehaviorSubject<any>(this.loadUser());
  user$ = this.userSub.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    const payload = {
      ...credentials,
      email: credentials.email.trim(),
    };

    return this.http
      .post<AuthResponse>(`${this.api}/login`, payload)
      .pipe(tap((res) => this.storeSession(res)));
  }

  refreshToken() {
    const token = localStorage.getItem('refreshToken');

    // backend will reject if no token
    const body = token ? { refreshToken: token } : {};

    return this.http
      .post<AuthResponse>(`${this.api}/refresh`, body)
      .pipe(tap((res) => this.storeSession(res)));
  }

  logout() {
    ['accessToken', 'refreshToken', 'user'].forEach((k) =>
      localStorage.removeItem(k)
    );
    this.userSub.next(null);
  }

  getRole() {
    return this.userSub.getValue()?.role;
  }

  requestPasswordReset(email: string) {
    return this.http.post<{ ok: boolean; token?: string }>(
      `${this.api}/forgot`,
      { email: email.trim() }
    );
  }

  resetPassword(token: string, password: string) {
    return this.http.post<{ ok: boolean }>(`${this.api}/reset`, {
      token,
      password,
    });
  }

  // save tokens + user state
  private storeSession(res: AuthResponse) {
    localStorage.setItem('accessToken', res.accessToken);

    if (res.refreshToken) {
      localStorage.setItem('refreshToken', res.refreshToken);
    }

    localStorage.setItem('user', JSON.stringify(res.user));
    this.userSub.next(res.user);
  }

  private loadUser() {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }
}
