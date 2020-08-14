import { ConnectService } from './../../services/connect.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionMessagesComponent } from '../../components/session-messages/session-messages.component';
import { MessagesService } from '../../services/messages.service';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private connectService: ConnectService,
    private messagesService: MessagesService
  ) {}
  socket: SocketIOClient.Socket;
  @ViewChild(SessionMessagesComponent)
  messagesComponent: SessionMessagesComponent;
  textMessage: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.joinSession(params.get('id'));
    });
  }

  joinSession(id: string) {
    this.connectService.checkSession(id).subscribe(
      () => {
        this.socketIni(this.connectService.joinSession(id));
      },
      (error) => {
        console.log('Sorry diese Session gibt es nicht :(');
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
    this.textMessage = '';
    this.socket.emit(environment.messageIdentifier, msg);
  }
}
