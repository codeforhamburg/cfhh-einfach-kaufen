import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateStartComponent } from './donate-start.component';

describe('DonateStartComponent', () => {
  let component: DonateStartComponent;
  let fixture: ComponentFixture<DonateStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
