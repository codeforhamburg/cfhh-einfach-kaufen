import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DropdownFilterService } from "./dropdown-filter.service"

@Component({
  selector: 'wbc-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @ViewChild('dropdownFilter') dropdownFilter__container;
  private dataSource: any[] = this.dataService.dataStadtteilNamen;
  private filterOnValue: any = "name";
  private filteredList: any[] = [];
  private input: string = "";
  private dropdownVisible: boolean = false;
  private itemIndex: number = 0;
  private hasFocus: Boolean = false;


  constructor(private dataService: DataService, private dropDownFilterService: DropdownFilterService) {
  }

  ngOnInit() {
    this.filteredList = this.dataSource;
  }
  
  /**
   * fires on change of input ele
   */
  onInputChange(evt) {
    this.updateFilteredList(this.input);
  }

  onFocus(evt) {
    this.dropdownVisible = true;
    if (this.input) { // catch user focuses after prev selecting item
      this.updateFilteredList(this.input);
    }
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

  selectOne(item) {
    this.input = item[this.filterOnValue]; // set input value to selected item
    this.updateFilteredList(this.input);
    this.dropdownVisible = false;
    this.itemIndex = 0;
    this.triggerObservable(item);
    console.log(item);
    
  }

  /**
   * update observable subscribers
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
