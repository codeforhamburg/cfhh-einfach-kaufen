import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'wbc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private dataService: DataService, private mapService: MapService) { }

  ngOnInit() {
  }

}
