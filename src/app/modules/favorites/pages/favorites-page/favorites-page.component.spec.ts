import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPageComponent } from './favorites-page.component';
import { PlayListBodyComponent } from '@shared/components/play-list-body/play-list-body.component';
import { PlayListHeaderComponent } from '@shared/components/play-list-header/play-list-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderListPipe } from '@shared/pipes/order-list.pipe';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [FavoritesPageComponent, 
        PlayListBodyComponent, 
        PlayListHeaderComponent, 
        OrderListPipe]
    });
    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
