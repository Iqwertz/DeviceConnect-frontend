import {
  imageResult,
  FileHandlerService,
} from './../../services/file-handler.service';
import { SendMessageObject } from './../../pages/session/session.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faArrowRight,
  faCamera,
  faFile,
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

  imageData: imageResult = {
    cardImageBase64: '',
    imageError: '',
    isImageSaved: false,
  };

  constructor(private fileHandlerService: FileHandlerService) {}

  ngOnInit(): void {}

  sendMessage(msg: string) {
    if (this.imageData.cardImageBase64.length > 1) {
      this.textMessage = '';
      const message: SendMessageObject = {
        message: this.imageData.cardImageBase64,
        contentType: 'Picture',
      };
      this.newMessageChange.emit(message);
      this.deleteImage();
    } else {
      if (msg.length > 0) {
        if (msg.length <= environment.maxMessageLength) {
          this.textMessage = '';
          const message: SendMessageObject = {
            message: msg,
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
  fileChangeEvent(fileInput: any) {
    this.fileHandlerService.fileImageHandler(fileInput).subscribe((result) => {
      this.imageData = result;
    });
  }

  deleteImage() {
    this.imageData.imageError = '';
    this.imageData.cardImageBase64 = '';
    this.imageData.isImageSaved = false;
  }
}
