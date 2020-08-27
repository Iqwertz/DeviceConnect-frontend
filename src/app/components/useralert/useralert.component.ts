/////////////////////////////////////////////
/*
user alert Component
Displays user alerts at the top of the site. THe message can be succes (green) or error (red)
*/
/////////////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  UserAlertService,
  UserAlertTypes,
} from '../../services/user-alert.service';

@Component({
  selector: 'app-useralert',
  templateUrl: './useralert.component.html',
  styleUrls: ['./useralert.component.scss'],
})
export class UseralertComponent implements OnInit {
  alertText: string = ''; //text of the alert
  alertOpen: boolean = false;
  alertType: UserAlertTypes = 'error';
  private timeout;
  private timeoutDelay: number = environment.userAlertTimeout;

  constructor(private userAlertService: UserAlertService) {}
  ngOnInit(): void {
    this.userAlertService.onUpdate$.subscribe((alert) => {
      //subsrcibe to user alert service and set new user alert on change
      clearTimeout(this.timeout);
      this.closeAlert();
      this.alertText = alert.alert;
      this.alertOpen = true;
      this.alertType = alert.type;
      this.timeout = setTimeout(() => {
        this.closeAlert();
      }, this.timeoutDelay);
    });
  }

  private closeAlert() {
    //closes alert
    this.alertText = '';
    this.alertOpen = false;
  }
}
