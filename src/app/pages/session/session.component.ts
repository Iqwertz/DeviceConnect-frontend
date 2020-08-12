import { ConnectService } from './../../services/connect.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private connectService: ConnectService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.joinSession(params.get('id'));
    });
  }

  joinSession(id: string) {
    this.connectService.joinSession(id);
  }
}
