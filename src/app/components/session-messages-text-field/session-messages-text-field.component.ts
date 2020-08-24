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
    dataBase64: '',
    error: '',
    isSaved: false,
    name: '',
    type: 'Document',
  };

  constructor(private fileHandlerService: FileHandlerService) {}

  ngOnInit(): void {}

  sendMessage(msg: string) {
    if (this.fileData.dataBase64.length > 1) {
      this.textMessage = '';
      const message: SendMessageObject = {
        message: this.fileData.name,
        base64Data: this.fileData.dataBase64,
        contentType: this.fileData.type,
      };
      this.newMessageChange.emit(message);
      this.deleteFile();
    } else {
      if (msg.length > 0) {
        if (msg.length <= environment.maxMessageLength) {
          this.textMessage = '';
          const message: SendMessageObject = {
            message: msg,
            base64Data: '',
            contentType: 'Text',
          };
          this.newMessageChange.emit(message);
        } else {
          alert(
            'The Message is longer than the permitted amount of ' +
              environment.maxMessageLength +
              ' chars'
          );
        }
      }
    }
  }

  //Image Upload
  ///Image Upload:
  fileChangeEvent(fileInput: any, fileType: FileType) {
    this.fileHandlerService
      .fileImageHandler(fileInput, fileType)
      .subscribe((result) => {
        console.log(result.name);
        this.fileData = result;
        if (this.fileData.error.length > 0) {
          alert(this.fileData.error);
        }
      });
  }

  deleteFile() {
    this.fileData.error = '';
    this.fileData.dataBase64 = '';
    this.fileData.isSaved = false;
    this.fileData.name = '';
    this.fileData.type = 'Document';
  }
}
