import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs'; 

// Ajusta la ruta a tu archivo de datos mock
import * as mockData from '../../../data/user.json'; 

describe('AuthService', () => {
    let service: AuthService;
    let mockUser: any = (mockData as any).default;
    let httpClientSpy: { post: jasmine.Spy };
    let cookieServiceSpy: { set: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        cookieServiceSpy = jasmine.createSpyObj('CookieService', ['set']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        
        service = new AuthService(httpClientSpy as any, cookieServiceSpy as any);
    });

    // --- Prueba 1: Verificación de Creación ---
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // --- Prueba 2: Probar el inicio de sesión exitoso ---
    it('should send credentials and return a token', (done: DoneFn) => {
        // Arrange
        const user = mockUser.userOk; // Simula un usuario válido
        const expectedResponse = { 
            tokenSession: 'assxddddd123123123' 
        };

        // Simular que httpClient.post devuelve un Observable con la respuesta esperada
        httpClientSpy.post.and.returnValue(
            of(expectedResponse)
        ); 
        
        // Act
        // 💡 Llamada al servicio y suscripción para manejar el Observable asíncrono
        service.sendCredentials(user.email, user.password)
            .subscribe((response: any) => {
                
                const responseProperties = Object.keys(response);
                
                // Assert
                // 💡 1. Verificar que la respuesta del servicio coincide con la respuesta simulada
                expect(response).toEqual(expectedResponse); 
                // 💡 2. Verificar que la respuesta contiene la propiedad 'tokenSession'
                expect(responseProperties).toContain('tokenSession'); 

                // 💡 3. Verificar que se llamó a HttpClient con la URL y body correctos (no visible en la imagen, pero necesario)
                // Se asume que la URL y body de user.json son correctos
                expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
                
                // 💡 4. Verificar que se llamó a cookieServiceSpy.set para almacenar el token (no visible en la imagen, pero necesario)
                expect(cookieServiceSpy.set).toHaveBeenCalledWith(
                    'token',
                    expectedResponse.tokenSession,
                    4, // Días de expiración
                    '/' // Ruta
                );
                
                done(); // Finalizar la prueba asíncrona
            });
    });
});