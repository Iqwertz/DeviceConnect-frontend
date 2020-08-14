import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-session-messages-text-field',
  templateUrl: './session-messages-text-field.component.html',
  styleUrls: ['./session-messages-text-field.component.scss'],
})
export class SessionMessagesTextFieldComponent implements OnInit {
  textMessage: string;
  @Output() newMessageChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  sendMessage(msg: string) {
    this.textMessage = '';
    this.newMessageChange.emit(msg);
  }
}
