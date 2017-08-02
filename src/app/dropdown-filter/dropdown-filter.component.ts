import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DropdownFilterService } from "./dropdown-filter.service"
import { MapBoxGeocoderService } from '../services/mapBoxGeocoder.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

@Component({
  selector: 'wbc-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  private dataSource: any[] = this.dataService.dataStadtteilNamen;                  // local, static source Data to filter on
  private dataSourceObservable = this.MapBoxGeocoderService;                        // optional remote, dynamic source Data to filter on
  private filterOnValue: any = "place_name";                                        // data[key] to filter on
  private addInfo: any = "name:prefix";                                             // optional data[addInfo] prefix to display for filtered Data
  private debounceTime = 300;                                                       // time to debounce if onDebouncedInputChange is used
  private disableCollapse: Boolean = true;                                          // true disables collapsing
  
  private input: string = "";                                                       // ngModel, triggers ngModelChange = onInputChange()
  private filteredList: any[] = [];
  private dropdownVisible: boolean = false;
  private itemIndex: number = 0;
  private hasFocus: Boolean = false;
  private inputChangedDebouncer: Subject<string> = new Subject<string>();
  private isLoading: Boolean = false;
  @ViewChild('dropdownFilter') dropdownFilter__container;
  

  constructor(private dataService: DataService, private dropDownFilterService: DropdownFilterService, private MapBoxGeocoderService: MapBoxGeocoderService) {
    if (this.dataSourceObservable) {
      this.inputChangedDebouncer
        .do(val => {
          this.isLoading = true;
        })
        .debounceTime(this.debounceTime)
        .subscribe(trigger => {
          this.onDebouncedInputChange();
        });
    }
  }

  ngOnInit() {
    // initially set results = static data
    this.filteredList = this.dataSource;
  }
  
  // fires imidiatly on change of input ele
  onInputChange() {
    this.itemIndex = 0; // reset selection, case: search, 2*DOWN (2. item selected), clear input, search again.

    // updates with instantly available data from static source
    this.updateFilteredList(this.input);

    // trigger input debouncer
    if (this.input) {
      this.inputChangedDebouncer.next(this.input);
    }
  }

  // fires after input + debounceTime
  onDebouncedInputChange() {
    // request data from remote geolocator && join results
    console.log(this.input);
    
    this.dataSourceObservable.geocode(this.input)
      .subscribe(data => {
        let features = data.features;
        
        // features = this.sortByKey(features, "place_name");

        // join remote data to local, filtered results
        features.forEach(ele => {
          ele["source"] = "mapBox";
        });
        this.filteredList = this.filteredList.concat(features);
        this.isLoading = false;
      });
  }

  onFocus(evt) {
    this.dropdownVisible = true;
  }

  onBlur(evt) {
    this.dropdownVisible = false;
  }

  /**
   * additional to onInputChange to catch interactions that
   * doesn't change input value, f.e. esc or enter
   */
  inputKeyHandler(evt) {
    let totalNumItem = this.filteredList.length;

    switch (evt.keyCode) {
      case 27: // ESC, hide auto complete
        break;

      case 38: // UP, select the previous li el
        evt.preventDefault();  
        this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
        this.scrollToView(this.itemIndex);
        break;

      case 40: // DOWN, select the next li el or the first one
        evt.preventDefault();  
        let sum = this.itemIndex;
        if (this.itemIndex === null) {
          sum = 0;
        } else {
          sum = sum + 1;
        }
        this.itemIndex = (totalNumItem + sum) % totalNumItem;
        this.scrollToView(this.itemIndex);
        break;

      case 13: // ENTER, choose it!!
        if (this.filteredList.length > 0) {
          this.selectOne(this.filteredList[this.itemIndex]);
        }
        evt.target.blur();
        break;
    }
  };

  updateFilteredList(keyword: string) {
    this.itemIndex = 0; //reset eventual previous selection
    this.filteredList = this.filter(this.dataSource, keyword);
  }

  /**
   * returns new, filtered array
   */
  filter(list: any[], keyword: string) {
    return list.filter(
      el => {
        let objStr = JSON.stringify(el).toLowerCase();
        keyword = keyword.toLowerCase();
        return objStr.indexOf(keyword) !== -1;
      }
    );
  }

  /**
   * returns sorted array
   */
  sortByKey(arr, sortonKey) {
    return arr.sort(function (a, b) {
      var compA = a[sortonKey];
      var compB = b[sortonKey];
      if (typeof compA === "string") {
        compA.toUpperCase();
        compB.toUpperCase();
      }
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
  }

  selectOne(item) {
    console.log("selectedItem: ", item);
    this.dropdownVisible = false;
    this.triggerObservable(item);
    this.input = item.place_name;
  }

  /**
   * triggers service subscribers
   */
  triggerObservable(val) {
    this.dropDownFilterService.setData(val);
  }

  clearInput() {
    this.dropdownVisible = false;
    this.itemIndex = 0;
    this.input = null;
    this.triggerObservable(null);
    this.updateFilteredList("");  // reset filteredList
  }

  scrollToView(index) {
    const container = this.dropdownFilter__container.nativeElement;
    const ul = container.querySelector('ul');
    const li = ul.querySelector('li');  //just sample the first li to get height
    const liHeight = li.offsetHeight;
    const scrollTop = ul.scrollTop;
    const viewport = scrollTop + ul.offsetHeight;
    const scrollOffset = liHeight * index;
    if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
      ul.scrollTop = scrollOffset;
    }
  }
}
