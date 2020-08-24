import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface fileResult {
  error: string;
  isSaved: boolean;
  dataBase64: string;
  name: string;
  type: FileType;
}

export type FileType = 'picture' | 'document';

@Injectable({
  providedIn: 'root',
})
export class FileHandlerService {
  constructor() {}

  fileImageHandler(fileInput, fileType: FileType): Observable<fileResult> {
    let results: fileResult = {
      error: '',
      isSaved: false,
      dataBase64: '',
      name: '',
      type: fileType,
    };

    results.error = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      let max_size;
      let allowed_types;
      let forbidden_types;
      let max_height;
      let max_width;
      if (fileType == 'picture') {
        // Size Filter Bytes
        max_size = environment.pictureLimits.maxSize;
        allowed_types = environment.pictureLimits.allowedTypes;
        max_height = environment.pictureLimits.maxHeight;
        max_width = environment.pictureLimits.maxWidth;
      } else if (fileType == 'document') {
        max_size = environment.fileLimits.maxSize;
        forbidden_types = environment.fileLimits.forbiddenTypes;
      }

      if (fileInput.target.files[0].size > max_size) {
        results.error = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return Observable.create((observer) => {
          observer.next(results);
          observer.complete();
        });
      }

      if (fileType == 'picture') {
        if (!allowed_types.includes(fileInput.target.files[0].type)) {
          results.error = `Only these FileTypes are allowd: ( ${allowed_types.toString()} )`;
          return Observable.create((observer) => {
            observer.next(results);
            observer.complete();
          });
        }
      } else if (fileType == 'document') {
        if (forbidden_types.includes(fileInput.target.files[0].type)) {
          results.error = `Sorry these file types are forbidden: ( ${allowed_types.toString()} )`;
          return Observable.create((observer) => {
            observer.next(results);
            observer.complete();
          });
        }
      }

      results.name = fileInput.target.files[0].name;

      const reader = new FileReader();
      return Observable.create((observer) => {
        reader.onload = (e: any) => {
          if (fileType == 'picture') {
            const image = new Image();
            image.src = e.target.result;
            image.onload = (rs) => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              if (img_height > max_height && img_width > max_width) {
                results.error =
                  'Maximum dimentions allowed ' +
                  max_height +
                  '*' +
                  max_width +
                  'px';
                observer.next(results);
                observer.complete();
              } else {
                const imgBase64Path = e.target.result;
                results.dataBase64 = imgBase64Path;
                results.isSaved = true;
                observer.next(results);
                observer.complete();
              }
            };
          } else if (fileType == 'document') {
            results.dataBase64 = e.target.result;
            results.isSaved = true;
            observer.next(results);
            observer.complete();
          }
        };

        reader.readAsDataURL(fileInput.target.files[0]);
      });
    }
  }
}
