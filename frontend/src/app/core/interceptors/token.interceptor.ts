import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  // attach JWT token to outgoing requests and auto retry on expiry
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    // add auth header if token exists
    const requestToSend = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        })
      : req;

    return next.handle(requestToSend).pipe(
      catchError((err: HttpErrorResponse) => {
        
        // skip refresh logic for login/refresh endpoints
        const authRoute =
          req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

        // token expired => try refreshing
        if (err.status === 401 && !authRoute) {
          return this.auth.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('accessToken');

              // retry original request with the updated token
              const retry = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });

              return next.handle(retry);
            })
          );
        }

        // all other errors
        return throwError(() => err);
      })
    );
  }
}
