import { Component, OnInit } from '@angular/core';
import {
  UserAlertService,
  UserAlertTypes,
} from '../../services/user-alert.service';
import {
  MessagesService,
  MessageObject,
} from '../../services/messages.service';
import {
  faSearch,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-messages',
  templateUrl: './search-messages.component.html',
  styleUrls: ['./search-messages.component.scss'],
})
export class SearchMessagesComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private userAlertService: UserAlertService
  ) {}

  searchField: boolean = false;
  searchTerm: string = '';
  private searchIndex: number = 0;

  faSearch = faSearch;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  ngOnInit(): void {}

  search(reset: boolean) {
    if (reset) {
      this.searchIndex = 0;
    }
    const id: number = this.searchMessages(this.searchTerm);
    if (id >= 0) {
      this.messagesService.scrollToId(id);
    } else if (id == -2) {
      this.userAlertService.setUserAlert('no messages found', 'error');
    }
  }

  nextSearch() {
    this.searchIndex++;
    this.search(false);
  }

  lastSearch() {
    this.searchIndex--;
    this.search(false);
  }

  close() {
    this.searchField = false;
    this.searchTerm = '';
  }

  private searchMessages(q: string): number {
    const messages: MessageObject[] = this.messagesService.messages;
    let resultCount: number = 0;
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if (message.contentType != 'Picture' && message.type != 'status') {
        if (message.message.includes(q)) {
          if (this.searchIndex == resultCount) {
            return message.messageId;
          } else {
            resultCount++;
          }
        }
      }
    }
    if (resultCount > 0) {
      return -2;
    } else {
      return -1;
    }
  }
}
