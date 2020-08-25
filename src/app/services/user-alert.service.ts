import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserAlertTypes = 'success' | 'error';

export interface UserAlertObject {
  alert: string;
  type: UserAlertTypes;
}

@Injectable({
  providedIn: 'root',
})
export class UserAlertService {
  constructor() {}
  private alertData: UserAlertObject = {
    alert: '',
    type: 'error',
  };

  private onUpdate$$ = new BehaviorSubject<UserAlertObject>(this.alertData);

  get onUpdate$(): Observable<UserAlertObject> {
    return this.onUpdate$$.asObservable();
  }

  setUserAlert(text: string, type: UserAlertTypes) {
    this.alertData.alert = text;
    this.alertData.type = type;
    this.onUpdate$$.next(this.alertData);
  }
}
