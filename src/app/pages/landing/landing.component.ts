import { ConnectService } from './../../services/connect.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private connectService: ConnectService
  ) {}

  ngOnInit(): void {}

  createSession() {
    console.log('create Session');
    this.connectService.newSession().subscribe((res) => {
      this.connectService.joinSession(res.sessionId);
    });
  }

  joinSession(id: string) {
    console.log(id);
  }
}
