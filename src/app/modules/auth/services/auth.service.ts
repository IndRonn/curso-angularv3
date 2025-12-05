import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;
  
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {
    
    const body = {
      email,
      password
    };
    
    console.log('Sending credentials', body);
    
    return this.httpClient.post<any>(`${this.URL}/auth/login`, body).pipe(
      tap((data) => {
        // Almacenar el token en una cookie al recibir una respuesta exitosa
        this.cookieService.set('token', data.tokenSession, 4, '/');
      })
    );
  }
}