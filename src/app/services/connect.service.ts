import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';

export interface newSessionResponse {
  sessionId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConnectService implements OnInit {
  constructor(private http: HttpClient) {}
  socketUrl: string = environment.socketEndpoint;
  newSessionPath: string = '/new';
  socket;

  ngOnInit(): void {}

  newSession(): Observable<newSessionResponse> {
    return this.http.post<newSessionResponse>(
      this.socketUrl + this.newSessionPath,
      {}
    );
  }

  joinSession(id: string) {
    const path: string = '/' + id;
    this.socket = io(this.socketUrl, {
      path,
    });

    this.socket.on('chat message', function (msg) {
      console.log(msg);
    });
  }
}
