import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  // 💡 AGREGAR class="imagebroke" AQUÍ
  template: '<img class="imagebroke" appImgBroken [srcFallback]="srcFallback">'
})
class TestComponent {
  srcFallback = '';
}
describe('ImgBrokenDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgBrokenDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    // Nota: ElementRef debe ser importado y mockeado para instanciar la directiva
    const mockElementRef = new ElementRef(document.createElement('img'));
    const directive = new ImgBrokenDirective(mockElementRef);
    
    expect(directive).toBeTruthy();
  });

  it('should be create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set fallback image on error', () => {
    // Arrange
    const customFallback = 'assets/images/custom-fallback.png';
    component.srcFallback = customFallback;
    fixture.detectChanges();
    
    // 1. Obtenemos el elemento nativo (el HTML <img>)
    // Ahora sí lo encontrará porque agregamos la clase en el paso anterior
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('.imagebroke');
    
    // 2. Obtenemos la INSTANCIA de la directiva para poder llamar a sus métodos
    // Usamos By.directive para encontrar el elemento que tiene la directiva y luego el injector
    const debugElement = fixture.debugElement.query(By.directive(ImgBrokenDirective));
    const directiveInstance = debugElement.injector.get(ImgBrokenDirective);

    // Act
    // Llamamos al método que simula el error
    directiveInstance.handleError(); 
    
    // Forzamos la detección de cambios para que Angular actualice el DOM
    fixture.detectChanges();

    // Assert
    // Verificamos que el src del elemento nativo haya cambiado
    expect(imgElement.src).toContain(customFallback);
  });
});
