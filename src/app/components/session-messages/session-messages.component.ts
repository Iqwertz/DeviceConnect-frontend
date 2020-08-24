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
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
  faDownload = faArrowDown;
  @ViewChild('scroll') private myScrollContainer: ElementRef;

  @Input()
  reconnectError: boolean = false;

  ngOnInit(): void {
    this.messagesService.onUpdate$.subscribe((messagesList) => {
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

  downloadFileFromId(fileId: number) {
    console.log(fileId);
    let messageData: MessageObject = this.getMessagebyId(fileId);
    fetch(messageData.base64Data)
      .then((res) => res.blob())
      .then((res) => {
        let url = window.URL.createObjectURL(res);
        this.download(messageData.message, url);
      });
  }

  private download(file: string, blobdata) {
    var element = document.createElement('a');
    element.setAttribute('href', blobdata);
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private getMessagebyId(id: number) {
    for (let i = 0; i < this.messageList.length; i++) {
      if (this.messageList[i].messageId == id) {
        return this.messageList[i];
      }
    }
  }
}
