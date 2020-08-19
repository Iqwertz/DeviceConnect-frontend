import { UserData } from '../pages/session/session.component';

export class SetUserId {
  static type = 'SetUserId';
  constructor(public userId: string) {}
}

export class SetSessionId {
  static type = 'SetSessionId';
  constructor(public sessionId: string) {}
}

export class SetUserName {
  static type = 'SetUserName';
  constructor(public userName: string) {}
}

export class SetUserInSession {
  static type = 'SetUserInSession';
  constructor(public userInSession: Map<string, UserData>) {}
}
