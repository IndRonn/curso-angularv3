import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  observable$: Observable<any> = new Observable<any>();
  subject$: Subject<any> = new Subject<any>(); //No requiere un valor inicial
  behaviorSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null); //Solicita un valor inicial

  // Reproduccion de cancion
  trackInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public audio!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public playStatus$: BehaviorSubject<string> = new BehaviorSubject<string>('pause');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(
      track => {
        if (track) {
          this.setAudio(track);
          //console.log("Playing track: ", track);
        }
      }
    )

    this.listenAllEvents();
  }

  private setAudio(track: TrackModel): void {
    this.audio.src = track.url;
    this.audio.play();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
    // this.audio.addEventListener('timeupdate',
    //   () => {
    //     const currentTime = this.audio.currentTime;
    //     const duration = this.audio.duration;
    //     console.log(`currentTime: ${currentTime}, duration: ${duration}`);
    //   }
    //   , false);
  }

  private calculateTime = () => {
    const { currentTime, duration } = this.audio;
    //console.log(`currentTime: ${currentTime}, duration: ${duration}`);
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercetage(currentTime, duration);
  }
  // Current Time:
  private setTimeElapsed(currentTime: number): void {
    //console.log(`Time Elapsed: ${this.formatTime(currentTime)}`);
    const displayTime = this.formatTime(currentTime);

    this.timeElapsed$.next(displayTime);
  }

  // Remaining Time:
  private setTimeRemaining(currentTime: number, duration: number): void {
    const timeLeft = duration - currentTime;

    //console.log(`Remaining time: -${this.formatTime(timeLeft)}`);
    const displayTime = this.formatTime(timeLeft);

    this.timeRemaining$.next(`-${displayTime}`);
  }

  // Formatter for time
  private formatTime(currentTime: number): string {
    const minutes = Math.floor(currentTime / 60 % 60);
    const seconds = Math.floor(currentTime % 60);

    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${displayMinutes}:${displaySeconds}`;
  }

  private setPlayerStatus = (state: any) => {
    console.log('Audio event:', state);
    switch (state.type) {
        case 'play':
            this.playStatus$.next('play');
            break;
        case 'playing':
            this.playStatus$.next('playing');
            break;
        case 'ended':
            this.playStatus$.next('ended');
            break;
        case 'pause':             // Caso explícito
            this.playStatus$.next('pause');
            break;
        default:
            this.playStatus$.next('pause');
            break;
    }
}

  public togglePlayer(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  private setPercetage(currentTime: number, duration: number): void {
    const percetage = (currentTime / duration) * 100;
    this.playerPercentage$.next(percetage);
  }

  public seekAudio(percentage: number): void {
    
    const { duration } = this.audio;
    
    const seekTime = (percentage / 100) * duration;
    
    this.audio.currentTime = seekTime;
    
    console.log(`Seeking to ${seekTime} seconds (${percentage}%)`);
  }
}
