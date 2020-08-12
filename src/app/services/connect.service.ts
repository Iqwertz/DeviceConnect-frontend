import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface newSessionResponse {
  sessionId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConnectService implements OnInit {
  constructor(private http: HttpClient) {}
  socketUrl: string = 'http://localhost:3000/new';

  ngOnInit(): void {}

  newSession(): Observable<newSessionResponse> {
    return this.http.post<newSessionResponse>(this.socketUrl, {});
  }

  joinSession(id: number) {
    this.http.post<any>(this.socketUrl, {}).subscribe((res) => {
      console.log(res);
    });
  }
}
