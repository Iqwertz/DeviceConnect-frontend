/////////////////////////////////////////////
/*
search Message Text Component
Displays the search field
*/
/////////////////////////////////////////////
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
import { Store } from '@ngxs/store';
import { SetSearchTerm } from '../../store/app.action';

@Component({
  selector: 'app-search-messages',
  templateUrl: './search-messages.component.html',
  styleUrls: ['./search-messages.component.scss'],
})
export class SearchMessagesComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private userAlertService: UserAlertService,
    private store: Store
  ) {}

  searchField: boolean = false; //search field active status
  searchTerm: string = ''; //the current search term
  private searchIndex: number = 0; //the Index of the current searched message / used to go up and down in searched messages

  faSearch = faSearch;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  ngOnInit(): void {}

  search(reset: boolean) {
    //triggers a new search// if true the search Index gets reset
    this.store.dispatch(new SetSearchTerm(this.searchTerm)); //save searchterm in store
    if (reset) {
      //reset index if true
      this.searchIndex = 0;
    }
    const id: number = this.searchMessages(this.searchTerm); //searches messages and get id of matched message
    if (id >= 0) {
      //when id found scroll to it
      this.messagesService.scrollToId(id);
    } else if (id == -2) {
      // if no message is found, because no message is above or below -> alert user
      this.userAlertService.setUserAlert('no messages found', 'error');
    }
  }

  nextSearch() {
    //increases search index and trigger new search
    this.searchIndex++;
    this.search(false);
  }

  lastSearch() {
    //decrease search index and trigger new search
    this.searchIndex--;
    this.search(false);
  }

  close() {
    //closes search and clear search Term
    this.searchField = false;
    this.searchTerm = '';
    this.store.dispatch(new SetSearchTerm(this.searchTerm));
  }

  private searchMessages(q: string): number {
    //search messages for string / it returns the nth element of the searchIndex //returns -2 when no element found because search index is to high // returns -3 when no element is was found (it doesnt return -1 one because private server message have an id of -1)
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
      //check if something was found
      return -2;
    } else {
      return -3;
    }
  }
}
