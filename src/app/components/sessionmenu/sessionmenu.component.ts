import { UserData } from './../../pages/session/session.component';
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
  userName: String = 'Not Found';
  userInSession: Map<string, UserData>;
  userId: string = '';
  @Select(AppState.sessionId) sessionId$;
  @Select(AppState.userName) userName$;
  @Select(AppState.userInSession) userInSession$;
  @Select(AppState.userId) userId$;

  navOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.sessionId$.subscribe((sessionId: string) => {
      this.sessionId = sessionId;
    });

    this.userName$.subscribe((userName: string) => {
      this.userName = userName;
    });

    this.userId$.subscribe((userId: string) => {
      this.userId = userId;
    });

    this.userInSession$.subscribe((userInSession: Map<string, UserData>) => {
      this.userInSession = userInSession;
      this.userInSession.delete(this.userId);
      console.log(this.userInSession);
    });
  }
}
