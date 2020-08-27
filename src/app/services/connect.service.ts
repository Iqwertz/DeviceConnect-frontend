import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';

export interface NewSessionResponse {
  sessionId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConnectService implements OnInit {
  constructor(private http: HttpClient) {}
  socketUrl: string = environment.socketEndpoint;
  newSessionPath: string = '/new';
  socket: SocketIOClient.Socket = null;

  ngOnInit(): void {}

  newSession(): Observable<NewSessionResponse> {
    return this.http.post<NewSessionResponse>(
      this.socketUrl + this.newSessionPath,
      {}
    );
  }

  checkSession(id: string): Observable<void> {
    return this.http.get<void>(this.socketUrl + '/session/' + id);
  }

  joinSession(id: string): SocketIOClient.Socket {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    const path: string = '/' + id;
    this.socket = io(this.socketUrl, {
      path,
      reconnection: environment.reconnectSettings.reconnection,
      reconnectionDelay: environment.reconnectSettings.reconnectionDelay,
      reconnectionDelayMax: environment.reconnectSettings.reconnectionDelayMax,
      reconnectionAttempts: environment.reconnectSettings.reconnectionAttempts,
    });
    return this.socket;
  }
}
