import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-sessionmenu',
  templateUrl: './sessionmenu.component.html',
  styleUrls: ['./sessionmenu.component.scss'],
})
export class SessionmenuComponent implements OnInit {
  sessionId: String = '0000';
  @Select(AppState.sessionId) sessionId$;

  navOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.sessionId$.subscribe((sessionId: string) => {
      this.sessionId = sessionId;
    });
  }
}
