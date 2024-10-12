////////////////////////////////////////////////////
/*
Service: ConnectService
Description: This Service is used to create and join Sessions on the server
Interfaces:
  NewSessionResponse: Holds the respons when creating a new session
    sessionId: Id of the created session
Functions:
  newSession(); //sends a post request to the server and returns the session Id as a NewSessionRespons
  checkSession(id: string); //sends a get request to the server to check if the session exists / returns a http respons
  joinSession(id: string); //creates a new socket and connects it to the server / returns the connected socket
*/
///////////////////////////////////////////////////
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
  socketSubPath: string = environment.subPath;
  newSessionPath: string = '/new';
  socket: SocketIOClient.Socket = null;

  ngOnInit(): void {}

  newSession(): Observable<NewSessionResponse> {
    return this.http.post<NewSessionResponse>(
      this.socketUrl + this.socketSubPath + this.newSessionPath,
      {}
    );
  }

  checkSession(id: string): Observable<void> {
    return this.http.get<void>(
      this.socketUrl + this.socketSubPath + '/session/' + id
    );
  }

  joinSession(id: string): SocketIOClient.Socket {
    if (this.socket) {
      //check if there already is a socket if destroy it
      this.socket.close();
      this.socket = null;
    }
    const path: string = this.socketSubPath + '/' + id;
    this.socket = io(this.socketUrl, {
      //connect to socket and set reconnection settings
      path,
      reconnection: environment.reconnectSettings.reconnection,
      reconnectionDelay: environment.reconnectSettings.reconnectionDelay,
      reconnectionDelayMax: environment.reconnectSettings.reconnectionDelayMax,
      reconnectionAttempts: environment.reconnectSettings.reconnectionAttempts,
    });
    return this.socket;
  }
}
