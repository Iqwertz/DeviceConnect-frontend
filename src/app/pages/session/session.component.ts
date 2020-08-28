/////////////////////////////////////////////
/*
Session Component
Manages Session setup
*/
/////////////////////////////////////////////
import { ContentType } from './../../services/messages.service';
import { ConnectService } from './../../services/connect.service';
import { Component, OnInit, ViewChild, ɵɵviewQuery } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationError,
  NavigationEnd,
} from '@angular/router';
import { SessionMessagesComponent } from '../../components/session-messages/session-messages.component';
import {
  MessagesService,
  MessageObject,
} from '../../services/messages.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngxs/store';
import { UserAlertService } from '../../services/user-alert.service';
import {
  SetUserId,
  SetSessionId,
  SetUserName,
  SetUserInSession,
} from '../../store/app.action';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export interface SessionInitData {
  //Interface containing the session ini object
  userId: string;
  userName: string;
  sessionId: string;
}

export interface SendMessageObject {
  //Interface containing the message data when sending one
  message: string;
  base64Data: string;
  contentType: ContentType;
}

export interface UserData {
  //Interface containing User Data
  userName: string;
  userId: string;
}

@Component({
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private connectService: ConnectService,
    private messagesService: MessagesService,
    private store: Store,
    private uAlert: UserAlertService
  ) {}
  socket: SocketIOClient.Socket;
  @ViewChild(SessionMessagesComponent)
  messagesComponent: SessionMessagesComponent;
  currentSessionId: string;
  sessionError: boolean = false; //bool holding the session connection status
  reconnectionError: boolean = false; //is fals after max reconnection attempts are reached
  faExchange = faExchangeAlt;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      //get Id route parameter
      this.currentSessionId = params.get('id');
      this.joinSession(this.currentSessionId); //join session with url parameter
    });

    this.router.events.subscribe((event: Event) => {
      //router events
      if (event instanceof NavigationStart) {
        //do something on start activity
      }

      if (event instanceof NavigationError) {
        console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        this.messagesService.removeAllMessages();
        this.socket.close();
      }
    });
  }

  joinSession(id: string) {
    this.connectService.checkSession(id).subscribe(
      //connect with connect service initialise socket when succesfull
      () => {
        this.socketIni(this.connectService.joinSession(id));
        this.sessionError = false;
      },
      (error) => {
        console.log('Sorry diese Session gibt es nicht :(');
        this.sessionError = true;
      }
    );
  }

  socketIni(s: SocketIOClient.Socket) {
    //initialize socket and listen to events
    this.socket = s;
    this.messagesService.removeAllMessages();

    this.socket.on(environment.messageIdentifier, (msg: MessageObject) => {
      this.messagesService.addMessage(msg);
    });

    this.socket.on('SessionIni', (ini: SessionInitData) => {
      this.store.dispatch(new SetUserId(ini.userId));
      this.store.dispatch(new SetSessionId(ini.sessionId));
      this.store.dispatch(new SetUserName(ini.userName));
      this.uAlert.setUserAlert('Connected', 'success');
    });

    this.socket.on('newUser', (userData) => {
      const mappedData: Map<string, UserData> = new Map<string, UserData>(
        Object.entries(userData)
      );
      this.store.dispatch(new SetUserInSession(mappedData));
    });

    this.socket.on('disconnect', () => {
      this.sendStatus('Disconnected! Trying to reconnect...');
      this.uAlert.setUserAlert('Disconnected! Trying to reconnect...', 'error');
      console.log('disconnected');
    });

    this.socket.on('reconnect_failed', () => {
      this.reconnectionError = true;
      this.sendStatus(`Couldn't reconnect :(`);
      this.uAlert.setUserAlert(`Couldn't reconnect : (`, 'error');
      console.log('reconnect failed');
    });
  }

  sendStatus(status: string) {
    //sends a status message
    const msg: MessageObject = {
      //create message object
      message: status,
      messageId: -1,
      userId: 'SERVER',
      userName: 'Server',
      contentType: 'Text',
      base64Data: '',
    };
    this.messagesService.addMessage(msg); //add Message object
  }

  sendMessage(msg: SendMessageObject) {
    //send message by emiting it to the socket
    this.socket.emit(environment.messageIdentifier, msg);
  }
}
