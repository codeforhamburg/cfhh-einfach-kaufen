import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DropdownFilterService {
  public dropDownFilterService = new Subject();

  getData() {
    return this.dropDownFilterService.asObservable();
  }

  setData(val) {
    this.dropDownFilterService.next(val);
  }

  constructor() { }

}
