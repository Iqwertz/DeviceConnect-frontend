////////////////////////////////////////////////////
/*
Service: MessagesService
Description: This Service is used to handle new messages. The session-messages component listens to the onUpdate observable to check for new messages

Types:
  ContentType: Used to describe which kind of Content is in a message
  messageType: Used to describe the origin of the message
Interfaces:
  MessageObject: contains the Message data
    message: the message
    messageId: number which identifies the message, is unique
    userId: Id of the sender
    userName: Name of the sender
    contentType: Type of the content
    base64Data: contains the file data when one is sent
    data: date currently not used
    type: contains the origin of the message / This is determined in the message service

Functions:
  addMessage(message: string): determines origin, formats message and pushes it to the messages array
  removeAllMessages(): emptys messages array
  scrollToId(id: number): calls scroll to element in the messages component (component listens to observable)
*/
///////////////////////////////////////////////////

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Select } from '@ngxs/store';

export type ContentType = 'Document' | 'Picture' | 'Text';

export type messageType = 'sender' | 'receiver' | 'status';

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
  private onScrollToId$$ = new BehaviorSubject<number>(0);
  messages: MessageObject[] = [];

  get onUpdate$(): Observable<MessageObject[]> {
    return this.onUpdate$$.asObservable();
  }

  get onScrollToId$(): Observable<number> {
    return this.onScrollToId$$.asObservable();
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

  scrollToId(id: number) {
    this.onScrollToId$$.next(id);
  }

  private ngOnDestroy() {
    this.onUpdate$$.complete();
  }

  private formatLink(msg: MessageObject): MessageObject {
    //formats a link to make it clickable
    const text: string = msg.message;
    if (this.isUrl(text)) {
      msg.message = `<a href="${text}" target="_blank">${text}</a>`;
    }
    return msg;
  }

  private isUrl(url: string): boolean {
    //Checks if message is a url
    let pattern = new RegExp(
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
