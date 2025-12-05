import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TracksService } from '@modules/tracks/services/tracks.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent {

  @Input()
  tracks: Array<TrackModel> = [];

  optionSort: {
    property: string | null,
    order: string
  } = {
      property: null,
      order: 'asc'
    }

  constructor(private trackService: TracksService) { }

  ngOnInit(): void {
    //  const tracks$ = this.trackService.getAllElectronics$().subscribe(tracks => {
    //     this.tracks = tracks;
    //  });
  }

  changeSort(property: string) {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: (order === 'asc') ? 'desc' : 'asc'
    };
  }

}
