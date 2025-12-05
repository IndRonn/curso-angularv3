import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logError(error: any): void {
    console.error('[LOG Error global]: ', error);
  }

  logHttpError(error: any): void {
    console.error('[LOG HTTP Error global]: ', {
      status: error.status,
      message: error.message,
      url: error.url
    });
  }
}
