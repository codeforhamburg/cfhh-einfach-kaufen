import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'wbc-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {

  constructor(private mapService: MapService, private uiService: UiService) { }

  ngOnInit() {
  }

}
