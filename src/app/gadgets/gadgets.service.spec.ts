import { TestBed } from '@angular/core/testing';
import { GadgetService } from './gadgets.service';

describe('GadgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GadgetService = TestBed.get(GadgetService);
    expect(service).toBeTruthy();
  });
});
