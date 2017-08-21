import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'wbc-icon-filter',
  templateUrl: './icon-filter.component.html',
  styleUrls: ['./icon-filter.component.scss']
})
export class IconFilterComponent implements OnInit {

  constructor(public dataService: DataService, private mapService: MapService) { }

  ngOnInit() {
  }

  activateCat(cat) {
      this.dataService.activate(cat, '');
      this.mapService.filterData();

  }

}
