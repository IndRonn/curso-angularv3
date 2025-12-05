import { Component } from '@angular/core';
import { DataServiceService } from '@shared/services/data-service.service';
import { MessageService } from '@shared/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent {

  private subscription: Subscription = new Subscription();
  private messageSubscription: Subscription = new Subscription();
  constructor(private dataService: DataServiceService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.subscription = this.dataService.currentData.subscribe(data => {
      console.log('Dato de estaod: ', data);
    });

    this.messageSubscription = this.messageService.message$.subscribe(messageSource => {
      console.log('Mensaje Recibido: ', messageSource)
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.messagesubscription.unsubscribe();
  }



}
