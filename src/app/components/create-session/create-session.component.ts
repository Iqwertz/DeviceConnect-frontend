import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit {
  constructor(private connectService: ConnectService, private router: Router) {}

  ngOnInit(): void {}

  createSession() {
    this.connectService.newSession().subscribe((res) => {
      this.router.navigate(['session', res.sessionId]);
    });
  }
}
