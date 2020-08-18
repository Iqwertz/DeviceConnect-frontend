import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  MessagesService,
  messageObject,
} from '../../services/messages.service';

@Component({
  selector: 'app-session-messages',
  templateUrl: './session-messages.component.html',
  styleUrls: ['./session-messages.component.scss'],
})
export class SessionMessagesComponent implements OnInit {
  constructor(private messagesService: MessagesService) {}
  messageList: messageObject[] = [];

  @Input()
  reconnectError: boolean = false;

  ngOnInit(): void {
    this.messagesService.onUpdate$.subscribe((messagesList) => {
      this.messageList = messagesList;
    });
  }
}
