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
  alertText: string = '';
  alertOpen: boolean = false;
  alertType: UserAlertTypes = 'error';
  private timeout;
  private timeoutDelay: number = environment.userAlertTimeout;

  constructor(private userAlertService: UserAlertService) {}
  ngOnInit(): void {
    this.userAlertService.onUpdate$.subscribe((alert) => {
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
    this.alertText = '';
    this.alertOpen = false;
  }
}
