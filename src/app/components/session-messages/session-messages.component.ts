/////////////////////////////////////////////
/*
Session Message Text Component
Displays the messages
*/
/////////////////////////////////////////////
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
  messageList: MessageObject[] = []; //messages on the client side
  faDownload = faArrowDown;
  @ViewChild('scroll') private myScrollContainer: ElementRef;

  @Input()
  reconnectError: boolean = false;

  searchTerm: string = '';
  @Select(AppState.searchTerm)
  searchTerm$;

  ngOnInit(): void {
    this.messagesService.onUpdate$.subscribe((messagesList) => {
      //subscribe to message list and scroll to bottom after short delay (needed tolet some time to load data)
      this.messageList = messagesList;
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
    });

    this.messagesService.onScrollToId$.subscribe((id) => {
      //Subscribe to scroll to id and scroll to element when called
      this.scrollToElement(id.toString());
    });

    this.searchTerm$.subscribe((searchTerm: string) => {
      //subscribe to search term from store
      this.searchTerm = searchTerm;
    });
  }

  scrollToBottom(): void {
    //trys to sroll to the bottom of the message container
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  downloadFileFromId(fileId: number) {
    //gets message base 64 data converts it to a blob and downloads it
    console.log(fileId);
    let messageData: MessageObject = this.messagesService.getMessagebyId(
      fileId
    );
    fetch(messageData.base64Data)
      .then((res) => res.blob())
      .then((res) => {
        let url = window.URL.createObjectURL(res);
        this.download(messageData.message, url);
      });
  }

  textMessageClicked(type: messageType, text: string) {
    //checks if message isnt a status message and copys it to clipboard
    if (type != 'status') {
      this.copyStringToClipboard(text);
    }
  }

  scrollToElement(id: string) {
    //get element ref and scroll it into view
    try {
      let el = document.getElementById(id);
      el.scrollIntoView({ block: 'center' });
    } catch (err) {}
  }

  private copyStringToClipboard(str: string) {
    //copys string to clipboard by creating a textarea and copying it with document.executeCommand
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
    //downloads a file by creating an blob url and clicking it
    var element = document.createElement('a');
    element.setAttribute('href', blobdata);
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
