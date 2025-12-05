import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Hacer lo necesario para modificar la request
    // console.log("InjectSessionInterceptor: Interceptando la request", request);

    try {
      //
      const token = this.cookieService.get('token');
      let newRequest = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      return next.handle(newRequest);
      //
    } catch (error) {
      console.log("InjectSessionInterceptor: No se pudo agregar el token a la request");
    }

    // Procedemos a mutar la request para agregar el header de authorization
    return next.handle(request);
  }
}
