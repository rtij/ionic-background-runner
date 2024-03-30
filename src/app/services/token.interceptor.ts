import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let cloned = request.clone({
      headers: request.headers.append("ngrok-skip-browser-warning", `34738`)
    });
   
      return next.handle(cloned);
   }
}
// .pipe(catchError((error: HttpErrorResponse) => {
//   if (error.error['message'] == "Expired JWT Token" && error.status === 401) {
//     return this.Handle401Error(request, next);
//   } else {
//     return throwError(error);
//   }
// }));
// } else {
// return next.handle(request);
// }
// }

// private addToken(request: HttpRequest<unknown>) {
// if (this.token) {
// let cloned = request.clone({
//   headers: request.headers.append("Authorization", `Bearer ${this.token}`)
// });
// if (this.xauth) {
//   cloned = cloned.clone({
//     headers: cloned.headers.append("X-Auth-Token", this.xauth)
//   });
//   // return cloned;
// }
// return cloned;
// }
// else {
// return request;
// }
// }

// private Handle401Error(request: HttpRequest<any>, next: HttpHandler) {
// console.log("Token expired");
// if (!this.isRefreshing) {
// this.isRefreshing = true;
// this.refreshTokenSubject.next(null);
// return this.authService.RefreshToken().pipe(
//   switchMap((res: any) => {
//     this.isRefreshing = false;
//     this.refreshTokenSubject.next(res.token);
//     return next.handle(this.addToken(request));
//   }));
// } else {
// return this.authService.RefreshToken().pipe(
//   filter(token => token != null),
//   take(1),
//   switchMap((res: any) => {
//     return next.handle(this.addToken(request));
//   }));
// }
