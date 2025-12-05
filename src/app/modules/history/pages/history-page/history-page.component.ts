import { Component } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  // tracks: TrackModel[] = [];
  tracks: Observable<any> = of([]);

  constructor(private searchService: SearchService) {

  }

  ngOnInit(): void {

  }

  search(term: string) {
    // this.searchService.searchTracks(term).subscribe((response) => {
    //   this.tracks = response.data;
    //   console.log(this.tracks);
    // });
    this.tracks = this.searchService.searchTracks(term);
  }

}
