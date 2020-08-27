/////////////////////////////////////////////
/*
Session Message Text Component
Displays the input bar at the bottom of the site
*/
/////////////////////////////////////////////
import {
  fileResult,
  FileHandlerService,
  FileType,
} from './../../services/file-handler.service';
import { SendMessageObject } from './../../pages/session/session.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faArrowRight,
  faCamera,
  faFile,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { UserAlertService } from 'src/app/services/user-alert.service';

@Component({
  selector: 'app-session-messages-text-field',
  templateUrl: './session-messages-text-field.component.html',
  styleUrls: ['./session-messages-text-field.component.scss'],
})
export class SessionMessagesTextFieldComponent implements OnInit {
  textMessage: string;
  @Output() newMessageChange = new EventEmitter<SendMessageObject>();
  faArrowRight = faArrowRight;
  faCamera = faCamera;
  faFile = faFile;
  faFileAlt = faFileAlt;

  fileData: fileResult = {
    //file data default
    dataBase64: '',
    error: '',
    isSaved: false,
    name: '',
    type: 'Document',
  };

  constructor(
    private fileHandlerService: FileHandlerService,
    private userAlert: UserAlertService
  ) {}

  ngOnInit(): void {}

  sendMessage(msg: string) {
    if (this.fileData.dataBase64.length > 1) {
      //check if file data exists
      this.textMessage = '';
      const message: SendMessageObject = {
        //create message with file data
        message: this.fileData.name,
        base64Data: this.fileData.dataBase64,
        contentType: this.fileData.type,
      };
      this.newMessageChange.emit(message); //emit new Message
      this.deleteFile();
    } else {
      if (msg.length > 0) {
        //check if message has content
        if (msg.length <= environment.maxMessageLength) {
          //check if message isnt to large
          this.textMessage = '';
          const message: SendMessageObject = {
            //create message
            message: msg,
            base64Data: '',
            contentType: 'Text',
          };
          this.newMessageChange.emit(message); //emit message
        } else {
          this.userAlert.setUserAlert(
            'The Message is longer than the permitted amount of ' +
              environment.maxMessageLength +
              ' chars',
            'error'
          );
        }
      }
    }
  }

  fileChangeEvent(fileInput: any, fileType: FileType) {
    //called when file is uploaded converts file to fileobject with the filehandler service
    this.fileHandlerService
      .fileHandler(fileInput, fileType)
      .subscribe((result) => {
        this.fileData = result;
        if (this.fileData.error.length > 0) {
          this.userAlert.setUserAlert(this.fileData.error, 'error');
        }
      });
  }

  deleteFile() {
    //deletes file
    this.fileData.error = '';
    this.fileData.dataBase64 = '';
    this.fileData.isSaved = false;
    this.fileData.name = '';
    this.fileData.type = 'Document';
  }
}
