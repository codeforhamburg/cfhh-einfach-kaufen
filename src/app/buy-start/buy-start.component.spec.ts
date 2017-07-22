import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStartComponent } from './buy-start.component';

describe('BuyStartComponent', () => {
  let component: BuyStartComponent;
  let fixture: ComponentFixture<BuyStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
