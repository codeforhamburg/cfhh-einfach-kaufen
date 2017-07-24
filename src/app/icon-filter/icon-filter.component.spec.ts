import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFilterComponent } from './icon-filter.component';

describe('IconFilterComponent', () => {
  let component: IconFilterComponent;
  let fixture: ComponentFixture<IconFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
