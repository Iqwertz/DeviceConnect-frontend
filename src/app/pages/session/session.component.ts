import { ConnectService } from './../../services/connect.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationError,
  NavigationEnd,
} from '@angular/router';
import { SessionMessagesComponent } from '../../components/session-messages/session-messages.component';
import { MessagesService } from '../../services/messages.service';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private connectService: ConnectService,
    private messagesService: MessagesService
  ) {}
  socket: SocketIOClient.Socket;
  @ViewChild(SessionMessagesComponent)
  messagesComponent: SessionMessagesComponent;
  currentSessionId: string;
  sessionError: boolean = false;

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

    this.socket.on(environment.messageIdentifier, (msg) => {
      this.messagesService.addMessage(msg);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });

    this.socket.on('reconnect_failed', () => {
      console.log('reconnect failed');
    });
  }

  sendMessage(msg: string) {
    this.socket.emit(environment.messageIdentifier, msg);
  }
}
