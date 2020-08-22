import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface imageResult {
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileHandlerService {
  constructor() {}

  fileImageHandler(fileInput): Observable<imageResult> {
    let imageResults: imageResult = {
      imageError: '',
      isImageSaved: false,
      cardImageBase64: '',
    };

    imageResults.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = environment.pictureLimits.maxSize;
      const allowed_types = environment.pictureLimits.allowedTypes;
      const max_height = environment.pictureLimits.maxHeight;
      const max_width = environment.pictureLimits.maxWidth;

      if (fileInput.target.files[0].size > max_size) {
        imageResults.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return Observable.create((observer) => {
          observer.next(imageResults);
          observer.complete();
        });
      }
      console.log(fileInput.target.files[0].type);
      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        imageResults.imageError = 'Only Images are allowed ( JPG | PNG )';
        return Observable.create((observer) => {
          observer.next(imageResults);
          observer.complete();
        });
      }
      const reader = new FileReader();
      return Observable.create((observer) => {
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = (rs) => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            console.log(img_height, img_width);

            if (img_height > max_height && img_width > max_width) {
              imageResults.imageError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
              observer.next(imageResults);
              observer.complete();
            } else {
              const imgBase64Path = e.target.result;
              imageResults.cardImageBase64 = imgBase64Path;
              imageResults.isImageSaved = true;
              observer.next(imageResults);
              observer.complete();
            }
          };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
      });
    }
  }
}
