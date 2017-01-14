/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomProxyService } from './room-proxy.service';

describe('RoomProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomProxyService]
    });
  });

  it('should ...', inject([RoomProxyService], (service: RoomProxyService) => {
    expect(service).toBeTruthy();
  }));
});
