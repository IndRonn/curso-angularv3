import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPageComponent } from './auth-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs'; // Importante para simular respuestas

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  
  // Variables para los Mocks
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // 1. Crear Espías
    authServiceSpy = jasmine.createSpyObj('AuthService', ['sendCredentials']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ AuthPageComponent ],
      imports: [ 
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule 
      ],
      providers: [
        // 2. Reemplazar servicios reales por espías
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- SCENARIO 1: FORMULARIO INVÁLIDO (Cubre el ELSE) ---
  it('should NOT call sendCredentials if form is invalid', () => {
    // Arrange: Dejamos el formulario vacío (es inválido por defecto)
    component.formLogin.patchValue({ email: '', password: '' });

    // Act
    component.sendLogin();

    // Assert
    // Verificamos que NO se llamó al servicio porque el if(valid) lo bloqueó
    expect(authServiceSpy.sendCredentials).not.toHaveBeenCalled();
  });

  // --- SCENARIO 2: LOGIN EXITOSO (Cubre el IF y el NEXT) ---
  it('should call sendCredentials and navigate to home on success', () => {
    // Arrange
    const mockUser = { email: 'test@test.com', password: '12345678' };
    
    // Llenamos el formulario para que sea válido
    component.formLogin.setValue(mockUser);

    // Simulamos que el servicio responde CORRECTAMENTE (observable con datos)
    authServiceSpy.sendCredentials.and.returnValue(of({ token: 'fake-token' }));

    // Act
    component.sendLogin();

    // Assert
    // 1. Se llamó al servicio con los datos correctos
    expect(authServiceSpy.sendCredentials).toHaveBeenCalledWith(mockUser.email, mockUser.password);
    // 2. Se redirigió al home '/'
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    // 3. La variable errorLogin sigue en false
    expect(component.errorLogin).toBeFalse();
  });

  // --- SCENARIO 3: LOGIN FALLIDO (Cubre el IF y el ERROR) ---
  it('should set errorLogin to true when service fails', () => {
    // Arrange
    const mockUser = { email: 'test@test.com', password: '12345678' };
    component.formLogin.setValue(mockUser);

    // Simulamos que el servicio responde con ERROR (throwError)
    authServiceSpy.sendCredentials.and.returnValue(throwError(() => new Error('Credenciales malas')));

    // Act
    component.sendLogin();

    // Assert
    // 1. Se llamó al servicio
    expect(authServiceSpy.sendCredentials).toHaveBeenCalled();
    // 2. NO se navegó a ninguna parte
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    // 3. La variable errorLogin cambió a TRUE
    expect(component.errorLogin).toBeTrue();
  });

});