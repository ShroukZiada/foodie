/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SizinghelperService } from './sizinghelper.service';

describe('Service: Sizinghelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SizinghelperService]
    });
  });

  it('should ...', inject([SizinghelperService], (service: SizinghelperService) => {
    expect(service).toBeTruthy();
  }));
});
