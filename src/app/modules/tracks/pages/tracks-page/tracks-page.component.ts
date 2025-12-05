import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {
  tracksBetter: Array<TrackModel> = [];
  tracksElectronic: Array<TrackModel> = [];

  constructor(private tracksService: TracksService) {}

  ngOnInit(): void {
    this.tracksService.getAllTracks$().subscribe(tracks => {
      console.log(tracks);
      this.tracksBetter = tracks;
    });

    this.tracksService.getAllElectronics$().subscribe(tracks => {
      this.tracksElectronic = tracks;
    })

  }

  ngOndestroy(): void {

  }

}
