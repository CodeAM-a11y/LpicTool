import { TestBed } from '@angular/core/testing';

import { TempDataStore } from './temp-data-store';

describe('TempDataStore', () => {
  let service: TempDataStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempDataStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
