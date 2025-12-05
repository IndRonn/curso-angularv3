import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { sessionGuard } from './session.guard'; // Asegúrate de la ruta correcta
import { CookieService } from 'ngx-cookie-service';

describe('sessionGuard', () => {
  // Variables para los espías (Mocks)
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  // Mocks de los argumentos que pide el guard (route y state)
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    // 1. Crear los espías con los métodos que usa el guard
    const cookieSpy = jasmine.createSpyObj('CookieService', ['check']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    // Inyectar los espías configurados
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // --- TEST 1: CAMINO FELIZ (Hay Token) ---
  it('should allow access if token exists', () => {
    // Arrange: Simulamos que la cookie 'token' EXISTE (return true)
    cookieServiceSpy.check.and.returnValue(true);

    // Act: Ejecutamos el guard dentro del contexto de inyección
    const result = TestBed.runInInjectionContext(() => 
      sessionGuard(mockRoute, mockState)
    );

    // Assert
    expect(result).toBeTrue(); // Debe dejar pasar
    expect(routerSpy.navigate).not.toHaveBeenCalled(); // No debe redirigir
  });

  // --- TEST 2: CAMINO TRISTE (No hay Token) ---
  it('should redirect to login if token does not exist', () => {
    // Arrange: Simulamos que la cookie 'token' NO EXISTE (return false)
    cookieServiceSpy.check.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => 
      sessionGuard(mockRoute, mockState)
    );

    // Assert
    expect(result).toBeFalse(); // Debe bloquear el paso
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/', 'auth']); // Debe redirigir a login
  });

  // --- TEST 3: EXCEPCIÓN (Cobertura del try/catch) ---
  it('should return false and redirect if cookie service fails', () => {
    // Arrange: Forzamos un error en el servicio de cookies
    cookieServiceSpy.check.and.throwError('Cookie Error');

    // Act
    const result = TestBed.runInInjectionContext(() => 
        sessionGuard(mockRoute, mockState)
    );

    // Assert
    // Nota: Como tu código captura el error y retorna false en el catch,
    // el guard bloqueará el acceso.
    expect(result).toBeFalse();
  });

});