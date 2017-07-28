import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AutocompleteFilterService {
  public selectedAutocompleteFilter = new Subject();

  getData() {
    return this.selectedAutocompleteFilter.asObservable();
  }

  setData(val) {
    this.selectedAutocompleteFilter.next(val);
  }

  constructor() { }

}
