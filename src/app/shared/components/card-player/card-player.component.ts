import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent {
  @Input() mode: 'small' | 'big' = 'big';
  @Input() track!: TrackModel;

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }

  sendTrack(track: TrackModel) {
    this.mediaService.trackInfo$.next(track);
    console.log('Track sent:', track);
  }
}
