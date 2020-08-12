import { ConnectService } from './../../services/connect.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private connectService: ConnectService, public router: Router) {}

  ngOnInit(): void {}

  createSession() {
    console.log('create Session');
    this.connectService.newSession().subscribe((res) => {
      this.router.navigate(['session', res.sessionId]);
    });
  }
}
