import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-session-messages',
  templateUrl: './session-messages.component.html',
  styleUrls: ['./session-messages.component.scss'],
})
export class SessionMessagesComponent implements OnInit {
  constructor(private messagesService: MessagesService) {}
  messageList: string[] = [];

  ngOnInit(): void {
    this.messagesService.onUpdate$.subscribe((messagesList) => {
      this.messageList = messagesList;
    });
  }
}
