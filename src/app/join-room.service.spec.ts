/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JoinRoomService } from './join-room.service';

describe('JoinRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinRoomService]
    });
  });

  it('should ...', inject([JoinRoomService], (service: JoinRoomService) => {
    expect(service).toBeTruthy();
  }));
});
