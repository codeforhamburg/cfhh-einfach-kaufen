import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMapComponent } from './buy-map.component';

describe('BuyMapComponent', () => {
  let component: BuyMapComponent;
  let fixture: ComponentFixture<BuyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
