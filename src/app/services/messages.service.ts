import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Select } from '@ngxs/store';

export type ContentType = 'Picture' | 'Text';

export interface MessageObject {
  message: string;
  messageId: number;
  userId: string;
  userName: string;
  contentType: ContentType;
  date?: Date;
  type?: messageType;
}

export type messageType = 'sender' | 'receiver' | 'status';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {
    this.userId$.subscribe((uId: string) => {
      console.log('UID changed');
      this.userId = uId;
    });
  }

  @Select(AppState.userId)
  userId$;
  userId: string = null;

  private onUpdate$$ = new BehaviorSubject<MessageObject[]>([]);
  private messages: MessageObject[] = [];

  get onUpdate$(): Observable<MessageObject[]> {
    return this.onUpdate$$.asObservable();
  }

  addMessage(msg: MessageObject) {
    if (msg.userId === 'SERVER') {
      msg.type = 'status';
    } else if (msg.userId == this.userId) {
      msg.type = 'sender';
    } else {
      msg.type = 'receiver';
    }
    this.messages.push(msg);
    this.onUpdate$$.next(this.messages);
  }

  removeAllMessages() {
    this.messages = [];
    this.onUpdate$$.next(this.messages);
  }

  ngOnDestroy() {
    this.onUpdate$$.complete();
  }
}
