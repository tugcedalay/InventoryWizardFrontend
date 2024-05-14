import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';
import { APP_CONFIG } from '../../app.config';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let url = req.url;
  let headers = req.headers;
  let loginService = inject(LoginService);
  let toastrService = inject(ToastrService);
  let router = inject(Router);
  let appConfig: any = inject(APP_CONFIG);
   

  if (!url.startsWith("/assets")) {
    url = appConfig.serverURL + url;
    headers = headers.append('Authorization', 'Bearer ' + loginService.token);
  }
  let newReq = req.clone({
    url,
    headers,
  });

    return next(newReq).pipe(
      catchError((error) => {
        console.log(error.url);
        if (error instanceof HttpErrorResponse && error.url != appConfig.serverURL+ '/login' && error.status == 403) {
          // login işlemi yapılmıyor ve token hatası döndü
          return loginService.reLogin().pipe(
            switchMap((token: any) => {
              // toastrService.info("Tekrar giriş yapıldı");
              headers = headers.set('Authorization', 'Bearer ' + loginService.token);
              newReq = newReq.clone({
                headers,
              });
              return next(newReq);
            }),
            catchError(error => {
              toastrService.error("Tekrar giriş başarısız oldu");
              loginService.logout();
              router.navigateByUrl('/');
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  };
