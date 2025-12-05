import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  private skipById(tracks: TrackModel[], idToSkip: number): Promise<TrackModel[]> {
    return new Promise((resolve) => {
      const filteredTracks = tracks.filter(track => track._id !== idToSkip);
      resolve(filteredTracks);
    });
  }

  getAllTracks$(): Observable<TrackModel[]> {
    return this.httpClient.get<any>(`${this.URL}/tracks`).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getAllElectronics$(): Observable<TrackModel[]> {
    return this.httpClient.get<any>(`${this.URL}/tracks`).pipe(
      // map((response) => {
      //   return response.data.reverse();
      // }),
      // map((dataInvertida) => {
      //   return dataInvertida.filter((track: TrackModel) => {
      //     return track._id !== 1;
      //   });
      // })
      mergeMap(({ data }) => this.skipById(data, 5))
    );
  }

}
