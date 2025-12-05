import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LyfeCycleLoggerService } from '@shared/services/lyfe-cycle-logger.service';

@Component({
  selector: 'app-lifecycle-demo',
  templateUrl: './lifecycle-demo.component.html',
  styleUrls: ['./lifecycle-demo.component.css']
})
export class LifecycleDemoComponent {
  constructor(private logger: LyfeCycleLoggerService, private router: Router){
    this.logger.log('LifecycleDemoComponent', 'constructor', 'Componente padre creado');
  }

  inputData: string = '';
  parentData: string = '';
  cambiosDetectados = 0;

  ngOnInit(): void {
    this.logger.log('LifecycleDemoComponent', 'ngOnInit', 'Componente padre inicializado');
  }

  // Hook Faltante: Inicialización del contenido proyectado (ng-content)
  ngAfterContentInit(): void {
    this.logger.log('LifecycleDemoComponent', 'ngAfterContentInit', 'Contenido del padre inicializado');
  }

  // Hook Faltante: Verificación del contenido proyectado
  ngAfterContentChecked(): void {
    if (this.cambiosDetectados < 5) {
        this.logger.log('LifecycleDemoComponent', 'ngAfterContentChecked', 'Verificación de contenido del padre');
    }
  }

  ngAfterViewInit(): void {
    this.logger.log('LifecycleDemoComponent', 'ngAfterViewInit', 'Vista padre inicializado');
  }

  // Hook Faltante: Verificación de la vista (DOM actualizado)
  ngAfterViewChecked(): void {
    if (this.cambiosDetectados < 5) {
        this.logger.log('LifecycleDemoComponent', 'ngAfterViewChecked', 'Verificación de vista del padre');
    }
  }

  ngDoCheck(): void {
    this.cambiosDetectados++;
    if (this.cambiosDetectados < 5) {
      this.logger.log('LifecycleDemoComponent', 'ngDoCheck', 'Detección de cambios en el componente');
    }
  }

  ngOnDestroy(): void {
    this.logger.log('LifecycleDemoComponent', 'ngOnDestroy', 'Componente padre destruido');
  }

  // Lógica del componente
  goToTracks(): void {
    this.router.navigate(['/tracks']);
  }
 
  updateChildData(){
    this.parentData = this.inputData;
  }
}
