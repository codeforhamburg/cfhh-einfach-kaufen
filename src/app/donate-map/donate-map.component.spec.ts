import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateMapComponent } from './donate-map.component';

describe('DonateMapComponent', () => {
  let component: DonateMapComponent;
  let fixture: ComponentFixture<DonateMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
