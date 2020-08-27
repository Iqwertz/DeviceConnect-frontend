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
import { messageType } from '../../services/messages.service';
import { UseralertComponent } from '../useralert/useralert.component';
import { UserAlertService } from '../../services/user-alert.service';
import { AppState } from '../../store/app.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-session-messages',
  templateUrl: './session-messages.component.html',
  styleUrls: ['./session-messages.component.scss'],
})
export class SessionMessagesComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private uAlert: UserAlertService
  ) {}
  messageList: MessageObject[] = [];
  faDownload = faArrowDown;
  @ViewChild('scroll') private myScrollContainer: ElementRef;

  @Input()
  reconnectError: boolean = false;

  searchTerm: string = '';
  @Select(AppState.searchTerm)
  searchTerm$;

  ngOnInit(): void {
    this.messagesService.onUpdate$.subscribe((messagesList) => {
      this.messageList = messagesList;
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
    });

    this.messagesService.onScrollToId$.subscribe((id) => {
      this.scrollToElement(id.toString());
    });

    this.searchTerm$.subscribe((searchTerm: string) => {
      this.searchTerm = searchTerm;
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

  textMessageClicked(type: messageType, text: string) {
    if (type != 'status') {
      this.copyStringToClipboard(text);
    }
    this.scrollToElement('2');
  }

  scrollToElement(id: string) {
    try {
      let el = document.getElementById(id);
      el.scrollIntoView({ block: 'center' });
    } catch (err) {}
  }

  private copyStringToClipboard(str: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = str;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.uAlert.setUserAlert('Successfully copied to clipboard', 'success');
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
