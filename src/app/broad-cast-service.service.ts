import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import {filter,map} from 'rxjs/operators'

export interface Message {
  type: string;
  payload: any;
}


@Injectable()
export class BroadCastServiceService {

  constructor() { }
  private _handler: Subject<Message> = new Subject<Message>();

  broadcast(type: string, payload: any = null) {
    this._handler.next({ type, payload });
  }

  subscribe(type: string, callback: (payload: any) => void): Subscription {
    return this._handler.pipe(
      filter(message => message.type === type)).pipe(
      map(message => message.payload))
      .subscribe(callback);
  } 
}