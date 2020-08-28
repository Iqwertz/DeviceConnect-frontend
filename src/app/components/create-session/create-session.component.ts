/////////////////////////////////////////////
/*
creates session Component
Displays create session button
*/
/////////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import { Router } from '@angular/router';
import { UserAlertService } from '../../services/user-alert.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit {
  constructor(
    private connectService: ConnectService,
    private router: Router,
    private uAlert: UserAlertService
  ) {}

  ngOnInit(): void {}

  createSession() {
    //trys toi create a new session with the connect service and connects it on success
    this.connectService.newSession().subscribe(
      (res) => {
        this.router.navigate(['session', res.sessionId]);
      },
      (err) => {
        this.uAlert.setUserAlert(`Couldn't reach server`, 'error');
      }
    );
  }
}
