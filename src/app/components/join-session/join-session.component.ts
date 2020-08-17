import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss'],
})
export class JoinSessionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

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
