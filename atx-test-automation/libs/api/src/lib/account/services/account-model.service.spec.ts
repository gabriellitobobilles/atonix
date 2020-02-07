import { TestBed } from '@angular/core/testing';

import { AccountModelService } from './account-model.service';

describe('AccountModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountModelService = TestBed.get(AccountModelService);
    expect(service).toBeTruthy();
  });
});
