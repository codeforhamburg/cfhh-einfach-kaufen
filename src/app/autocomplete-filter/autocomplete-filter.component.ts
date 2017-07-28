import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';
import { AutocompleteFilterService } from "./autocomplete-filter.service"
import { Observable } from 'rxjs/Observable';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'wbc-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss'],
  animations: [
    trigger('isActive', [
      state('0', style({
        width: "46px",
        overflow: "hidden",
      })),
      state('1', style({
        width: "*",
        overflow: "visible",
      })),
      transition('0 => 1', animate('150ms ease-in')),
      transition('1 => 0', animate('150ms ease-out'))
    ])
  ]
})
  
export class AutocompleteFilterComponent implements OnInit {
  private dataSource : any[] = this.dataService.dataStadtteilNamen;
  private searchTerm : any = "name";
  private hasInput : Boolean = false;
  private inputValue : any = null;
  private hasFocus: Boolean = false;
  private isActive: String = "0"; //animation trigger doesn't take boolean...
  
  constructor(private dataService: DataService, private selectedAutocompleteFilter: AutocompleteFilterService ) {
  }
  
  ngOnInit() {
  }
  
  // define what property of source is shown in results list
  autocompleListFormatter = (data: any) => {
    return data[this.searchTerm];
  }

  // if user clicks on / press enter on list item
  onItemSelected(newVal) {
    console.log("Case 2: value is changed to ", newVal);
    this.triggerObservable(newVal);
    this.hasInput = true;
  }

  // on input change (of ngModel)
  onInputChange() {
    if (this.inputValue.length == 0) {
      this.triggerObservable(null);
      this.hasInput = false;
    } else {
      this.hasInput = true;
    }
  }

  // update observable subscribers
  triggerObservable(val) {
    this.selectedAutocompleteFilter.setData(val);
  }

  clearInput() {
    this.hasInput = false;
    this.inputValue = null;
    this.isActive = "0";
    this.triggerObservable(null);
  }

  onFocus(evt) {
    this.isActive = "1";
  }

  onBlur(evt) {
    if (!this.hasInput) {
      this.isActive = "0";
    }
  }
}