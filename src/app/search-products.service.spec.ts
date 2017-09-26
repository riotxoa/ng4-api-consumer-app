import { TestBed, inject } from '@angular/core/testing';

import { SearchProductsService } from './search-products.service';

describe('SearchProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchProductsService]
    });
  });

  it('should be created', inject([SearchProductsService], (service: SearchProductsService) => {
    expect(service).toBeTruthy();
  }));
});
