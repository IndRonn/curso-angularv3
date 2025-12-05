import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private data = new BehaviorSubject<String>('Hola');
  currentData = this.data.asObservable();

  constructor() { }

  updateData(newData : string) {
    this.data.next(newData);
  }

}
