import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyfecycleChildComponent } from '@shared/components/lyfecycle-child/lyfecycle-child.component';

describe('LyfecycleChildComponent', () => {
  let component: LyfecycleChildComponent;
  let fixture: ComponentFixture<LyfecycleChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LyfecycleChildComponent]
    });
    fixture = TestBed.createComponent(LyfecycleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
