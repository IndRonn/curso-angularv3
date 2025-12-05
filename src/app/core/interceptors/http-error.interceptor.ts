import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggingService } from '@shared/services/logging.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("HttpErrorInterceptor: ", request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se puede agregar lógica para manejar errores HTTP globalmente
        // console.error('HTTP Error intercepted:', error);
        this.loggingService.logHttpError(error);

        switch (error.status) {
          case 400:
            console.warn("Bad Request: El servidor no pudo entender la solicitud debido a una sintaxis inválida.");
            break;
          case 401:
            console.warn("Unauthorized: La solicitud requiere autenticación del usuario.");
            break;
          case 403:
            console.warn("Forbidden: El servidor entendió la solicitud, pero se niega a autorizarla.");
            break;
          case 404:
            console.warn("Not Found: El servidor no pudo encontrar el recurso solicitado.");
            break;
          case 500:
            console.warn("Internal Server Error: El servidor encontró una condición inesperada que le impidió completar la solicitud.");
            break;
          default:
            console.error(`Error ${error.status}: Ocurrió un error inesperado.`);
        }


        return throwError(() => error);
      })
    );
  }
}
