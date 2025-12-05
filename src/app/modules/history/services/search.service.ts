import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  searchTracks(term: string) {
    return this.httpClient.get<any>(`${this.URL}/tracks?term=${term}`)
      .pipe(
        map((response: any) => response.data)
      );
  }
}
