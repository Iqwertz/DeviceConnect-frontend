export class SetUserId {
  static type = 'SetUserId';
  constructor(public userId: string) {}
}

export class SetSessionId {
  static type = 'SetSessionId';
  constructor(public sessionId: string) {}
}
