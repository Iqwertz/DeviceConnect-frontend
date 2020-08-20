import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  MessagesService,
  MessageObject,
} from '../../services/messages.service';

@Component({
  selector: 'app-session-messages',
  templateUrl: './session-messages.component.html',
  styleUrls: ['./session-messages.component.scss'],
})
export class SessionMessagesComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}
  messageList: MessageObject[] = [];
  @ViewChild('scroll') private myScrollContainer: ElementRef;

  @Input()
  reconnectError: boolean = false;

  ngOnInit(): void {
    this.messagesService.onUpdate$.subscribe((messagesList) => {
      console.log(this.messageList);
      this.messageList = messagesList;
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
    });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
