import { TestBed } from '@angular/core/testing';

import { FlightsSearchService } from './flights-search.service';

describe('FlightsSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightsSearchService = TestBed.get(FlightsSearchService);
    expect(service).toBeTruthy();
  });
});
