import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'wbc-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  private dataSource: any[] = this.dataService.dataStadtteilNamen;
  private filterOnValue: any = "name";
  private filteredList: any[] = [];
  private input: string = null;
  private dropdownVisible: boolean = false;
  private itemIndex: number = 0;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.filteredList = this.dataSource;
    console.log(this.filteredList.length);
  }
  
  onInputChange(evt) {
    console.log(this.dropdownVisible);
    
    this.filteredList = this.filter(this.dataSource, this.input);
    console.log(this.filteredList.length);
    // if (this.input.length) {
    // } else {
    //   this.filteredList = this.dataSource;
    // }
  }

  onFocus(evt) {
    this.dropdownVisible = true;
    if (this.input) {                                         // user focuses after prev selecting item
      this.filteredList = this.filter(this.dataSource, this.input);
    }
  }

  onBlur(evt) {
    this.dropdownVisible = false;
  }

  inputKeyHandler(evt) {
    let totalNumItem = this.filteredList.length;

    switch (evt.keyCode) {
      case 27: // ESC, hide auto complete
        break;

      case 38: // UP, select the previous li el
        evt.preventDefault();  
        this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
        // this.scrollToView(this.itemIndex);
        break;

      case 40: // DOWN, select the next li el or the first one
        evt.preventDefault();  
        // this.dropdownVisible = true;
        let sum = this.itemIndex;
        if (this.itemIndex === null) {
          sum = 0;
        } else {
          sum = sum + 1;
        }
        this.itemIndex = (totalNumItem + sum) % totalNumItem;
        // this.scrollToView(this.itemIndex);
        break;

      case 13: // ENTER, choose it!!
        if (this.filteredList.length > 0) {
          this.selectOne(this.filteredList[this.itemIndex]);
        }
        // evt.preventDefault();
        evt.target.blur();
        break;

      // case 9: // TAB, choose if tab-to-select is enabled
      //   if (this.tabToSelect && this.filteredList.length > 0) {
      //     this.selectOne(this.filteredList[this.itemIndex]);
      //   }
      //   break;
    }
  };

  filterItem(value) {
    return Object.assign([], this.dataSource).filter(
      item => item[this.filterOnValue].toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

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
    console.log("selectOne: " + item[this.filterOnValue])
    this.input = item[this.filterOnValue];                        // set ui
    this.filteredList = this.filter(this.dataSource, this.input); // update list
    this.dropdownVisible = false;
    this.itemIndex = 0;
  }
}
