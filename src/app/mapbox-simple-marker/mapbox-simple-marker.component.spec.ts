import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBoxSimpleMarkerComponent } from './mapbox-simple-marker.component';

describe('MapBoxSimpleMarkerComponent', () => {
  let component: MapBoxSimpleMarkerComponent;
  let fixture: ComponentFixture<MapBoxSimpleMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBoxSimpleMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBoxSimpleMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
