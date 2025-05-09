import { TestBed } from '@angular/core/testing';

import { MovieValidationService } from './movie-validation.service';

describe('MovieValidationService', () => {
  let service: MovieValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
