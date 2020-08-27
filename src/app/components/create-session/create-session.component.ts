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
