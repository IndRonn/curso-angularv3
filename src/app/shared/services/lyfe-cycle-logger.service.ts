import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LyfeCycleLoggerService {

  constructor() { }
  log(component: string, hook: string, details?: any): void{
    if(details){
      console.log('[${component}] $(hook)', details || '');
    }
  }
}
