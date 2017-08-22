import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DropdownFilterService } from './dropdown-filter.service';
import { MapBoxGeocoderService } from '../services/mapBoxGeocoder.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'wbc-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ height: '0' })),
      transition('void => *', [
        style({ height: '0' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ height: '0' }))
      ])
    ])
  ]
})
export class DropdownFilterComponent implements OnInit {
  private dataSource: any[] = this.dataService.dataStadtteilNamen;                  // local, static source Data to filter on
  private dataSourceObservable = this.MapBoxGeocoderService;                        // optional remote, dynamic source Data to filter on
  public filterOnValue: any = 'place_name';                                        // data[key] to filter on
  public addInfo: any = 'name:prefix';                                             // optional data[addInfo] prefix to display for filtered Data
  private debounceTime = 300;                                                       // time to debounce if onDebouncedInputChange is used
  public disableCollapse: Boolean = true;                                          // true disables collapsing

  public input = '';                                                       // ngModel, triggers ngModelChange = onInputChange()
  public filteredList: any[] = [];
  public dropdownVisible = false;
  private itemIndex = 0;
  public hasFocus: Boolean = false;
  public inputChangedDebouncer: Subject<string> = new Subject<string>();
  public isLoading: Boolean = false;
  @ViewChild('dropdownFilter') dropdownFilter__container;


  constructor(public dataService: DataService, private dropDownFilterService: DropdownFilterService, private MapBoxGeocoderService: MapBoxGeocoderService) {
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
        const features = data.features;

        // features = this.sortByKey(features, "place_name");

        // join remote data to local, filtered results
        features.forEach(ele => {
          ele['source'] = 'mapBox';
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
    const totalNumItem = this.filteredList.length;

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
  }

  updateFilteredList(keyword: string) {
    this.itemIndex = 0; // reset eventual previous selection
    this.filteredList = this.filter(this.dataSource, keyword);
  }

  /**
   * returns new, filtered array
   */
  filter(list: any[], keyword: string) {
    return list.filter(
      el => {
        const objStr = JSON.stringify(el).toLowerCase();
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
      const compA = a[sortonKey];
      const compB = b[sortonKey];
      if (typeof compA === 'string') {
        compA.toUpperCase();
        compB.toUpperCase();
      }
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
  }

  selectOne(item: any) {
    console.log('selectedItem: ', item);
    this.triggerObservable(null);   // clear map
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
    this.updateFilteredList('');  // reset filteredList
  }

  scrollToView(index) {
    const container = this.dropdownFilter__container.nativeElement;
    const ul = container.querySelector('ul');
    const li = ul.querySelector('li');  // just sample the first li to get height
    const liHeight = li.offsetHeight;
    const scrollTop = ul.scrollTop;
    const viewport = scrollTop + ul.offsetHeight;
    const scrollOffset = liHeight * index;
    if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
      ul.scrollTop = scrollOffset;
    }
  }
}
