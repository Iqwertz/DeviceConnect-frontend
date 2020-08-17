import { ConnectService } from './../../services/connect.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private connectService: ConnectService, private router: Router) {}

  ngOnInit(): void {}

  createSession() {
    console.log('create Session');
    this.connectService.newSession().subscribe((res) => {
      this.router.navigate(['session', res.sessionId]);
    });
  }

  joinSession(id: string) {
    id = id.toUpperCase();
    this.router.navigate(['session', id]);
  }

  inputKey(event) {
    if (event.key === 'Backspace') {
      let element = event.srcElement.previousElementSibling; // get the sibling element

      if (element == null) {
        // check if its null
        return;
      } else {
        element.focus(); // focus if not null
      }
    } else if (event.currentTarget.value.length >= 1) {
      let element = event.srcElement.nextElementSibling; // get the sibling element

      if (element == null) {
        // check if its null
        return;
      } else {
        element.focus(); // focus if not null
      }
    }
  }
}
