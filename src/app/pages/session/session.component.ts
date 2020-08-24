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
import {
  SetUserId,
  SetSessionId,
  SetUserName,
  SetUserInSession,
} from '../../store/app.action';

export interface SessionInitData {
  userId: string;
  userName: string;
  sessionId: string;
}

export interface SendMessageObject {
  message: string;
  base64Data: string;
  contentType: ContentType;
}

export interface UserData {
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
    private store: Store
  ) {}
  socket: SocketIOClient.Socket;
  @ViewChild(SessionMessagesComponent)
  messagesComponent: SessionMessagesComponent;
  currentSessionId: string;
  sessionError: boolean = false;
  reconnectionError: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.currentSessionId = params.get('id');
      this.joinSession(this.currentSessionId);
    });

    this.router.events.subscribe((event: Event) => {
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
    this.socket = s;

    this.socket.on(environment.messageIdentifier, (msg: MessageObject) => {
      this.messagesService.addMessage(msg);
    });

    this.socket.on('SessionIni', (ini: SessionInitData) => {
      this.store.dispatch(new SetUserId(ini.userId));
      this.store.dispatch(new SetSessionId(ini.sessionId));
      this.store.dispatch(new SetUserName(ini.userName));
    });

    this.socket.on('newUser', (userData) => {
      const mappedData: Map<string, UserData> = new Map<string, UserData>(
        Object.entries(userData)
      );
      this.store.dispatch(new SetUserInSession(mappedData));
    });

    this.socket.on('disconnect', () => {
      this.sendStatus('Disconnected! Trying to reconnect...');
      console.log('disconnected');
    });

    this.socket.on('reconnect_failed', () => {
      this.reconnectionError = true;
      this.sendStatus(`Couldn't reconnect :(`);
      console.log('reconnect failed');
    });
  }

  sendStatus(status: string) {
    const msg: MessageObject = {
      message: status,
      messageId: -1,
      userId: 'SERVER',
      userName: 'Server',
      contentType: 'Text',
      base64Data: '',
    };
    this.messagesService.addMessage(msg);
  }

  sendMessage(msg: SendMessageObject) {
    this.socket.emit(environment.messageIdentifier, msg);
  }
}
