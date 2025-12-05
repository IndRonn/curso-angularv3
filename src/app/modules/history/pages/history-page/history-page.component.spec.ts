import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPageComponent } from './history-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '@modules/history/components/search/search.component';
import { PlayListBodyComponent } from '@shared/components/play-list-body/play-list-body.component';
import { OrderListPipe } from '@shared/pipes/order-list.pipe';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
        ],
      declarations: [
        HistoryPageComponent,
        SearchComponent,
        PlayListBodyComponent,
        OrderListPipe
      ],
    });

    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});