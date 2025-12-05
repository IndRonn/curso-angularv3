import { Component, Input, SimpleChanges } from '@angular/core';
import { LyfeCycleLoggerService } from '@shared/services/lyfe-cycle-logger.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent {

  constructor(private logger: LyfeCycleLoggerService) {
    this.logger.log('LifecycleChildComponent', 'constructor', 'Componente hijo creado');
  }
  
  @Input() parentData = '';

  ngOnChanges(changes: SimpleChanges): void {
    const cambios = Object.keys(changes).map(key => {
      const change = changes[key];
      const prev = change.previousValue;
      const curr = change.currentValue;
      return `Propiedad: ${key}, Anterior: ${prev}, Actual: ${curr}`;
    }).join('; ');
    this.logger.log('LifecycleChildComponent', 'ngOnChanges', `Datos del componente padre cambiaron: ${cambios}`);
  }

  ngOnInit(): void {
    this.logger.log('LifecycleChildComponent', 'ngOnInit', 'Componente hijo inicializado');
  }

  // Hook Faltante: Detección manual de cambios en el hijo
  ngDoCheck(): void {
    // Nota: Se ejecutará frecuentemente
    this.logger.log('LifecycleChildComponent', 'ngDoCheck', 'Detección de cambios en el hijo');
  }

  // Hook Faltante
  ngAfterContentInit(): void {
    this.logger.log('LifecycleChildComponent', 'ngAfterContentInit', 'Contenido del hijo inicializado');
  }

  // Hook Faltante
  ngAfterContentChecked(): void {
    this.logger.log('LifecycleChildComponent', 'ngAfterContentChecked', 'Verificación de contenido del hijo');
  }

  ngAfterViewInit(): void {
    this.logger.log('LifecycleChildComponent', 'ngAfterViewInit', 'Vista del componente hijo inicializada');
  }

  // Hook Faltante
  ngAfterViewChecked(): void {
    this.logger.log('LifecycleChildComponent', 'ngAfterViewChecked', 'Verificación de vista del hijo');
  }

  ngOnDestroy(): void {
    this.logger.log('LifecycleChildComponent', 'ngOnDestroy', 'Componente hijo destruido');
  }

}