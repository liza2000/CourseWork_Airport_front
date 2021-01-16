import { TestBed } from '@angular/core/testing';

import { BetweenComponentsService } from './betweenComponents.service';

describe('BookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetweenComponentsService = TestBed.get(BetweenComponentsService);
    expect(service).toBeTruthy();
  });
});
