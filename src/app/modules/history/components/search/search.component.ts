import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output()
  callBackData: EventEmitter<any> = new EventEmitter<any>();
  src: String = '';

  callSearch(term: String) {
    if (term.length >= 3) {
      this.callBackData.emit(term);
    }
  }

}
