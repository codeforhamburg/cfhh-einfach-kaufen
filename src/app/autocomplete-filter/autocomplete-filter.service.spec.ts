import { TestBed, inject } from '@angular/core/testing';

import { AutocompleteFilterService } from './autocomplete-filter.service';

describe('AutocompleteFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteFilterService]
    });
  });

  it('should be created', inject([AutocompleteFilterService], (service: AutocompleteFilterService) => {
    expect(service).toBeTruthy();
  }));
});
