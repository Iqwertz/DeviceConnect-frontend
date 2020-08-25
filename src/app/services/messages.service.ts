import { Injectable, OnInit, Sanitizer } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Select } from '@ngxs/store';

export type ContentType = 'Document' | 'Picture' | 'Text';

export interface MessageObject {
  message: string;
  messageId: number;
  userId: string;
  userName: string;
  contentType: ContentType;
  base64Data: string;
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
    if (msg.contentType == 'Text') {
      msg = this.formatLink(msg);
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

  private formatLink(msg: MessageObject): MessageObject {
    const text: string = msg.message;
    if (this.isUrl(text)) {
      msg.message = `<a href="${text}" target="_blank">${text}</a>`;
    }
    console.log(msg.message);
    return msg;
  }

  private isUrl(url: string): boolean {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // https protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(url);
  }
}
