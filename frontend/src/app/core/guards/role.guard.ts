import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  private hasRole(allowed: string[]): boolean {
    const role = this.auth.getRole();
    return allowed.includes(role);
  }

  canActivate(route: any) {
    const allowed = route.data?.roles || [];

    return this.auth.user$.pipe(
      map((user) => {
        if (user && allowed.includes(user.role)) {
          return true;
        }

        this.router.navigate(['/auth/unauthorized']);
        return false;
      })
    );
  }

  canLoad(route: Route) {
    const allowed = (route.data as any)?.roles || [];
    return this.hasRole(allowed as string[]);
  }
}
