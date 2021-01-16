import { TestBed } from '@angular/core/testing';

import { BookTicketsService } from './book-tickets.service';

describe('BookTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookTicketsService = TestBed.get(BookTicketsService);
    expect(service).toBeTruthy();
  });
});
