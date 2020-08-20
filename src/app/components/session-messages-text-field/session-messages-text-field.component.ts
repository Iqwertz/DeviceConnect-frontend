import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-session-messages-text-field',
  templateUrl: './session-messages-text-field.component.html',
  styleUrls: ['./session-messages-text-field.component.scss'],
})
export class SessionMessagesTextFieldComponent implements OnInit {
  textMessage: string;
  @Output() newMessageChange = new EventEmitter<string>();
  faArrowRight = faArrowRight;
  faCamera = faCamera;

  ///Image Upload
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor() {}

  ngOnInit(): void {}

  sendMessage(msg: string) {
    if (msg.length > 0) {
      if (msg.length <= environment.maxMessageLength) {
        this.textMessage = '';
        this.newMessageChange.emit(msg);
      } else {
        alert(
          'The Message is longer than the permitted amount of ' +
            environment.maxMessageLength +
            ' chars'
        );
      }
    }
  }

  //Image Upload
  ///Image Upload:
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      console.log(fileInput.target.files[0].type);
      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  deleteImage() {
    this.imageError = '';
    this.cardImageBase64 = '';
    this.isImageSaved = false;
  }
}
