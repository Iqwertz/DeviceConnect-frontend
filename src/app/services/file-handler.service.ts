////////////////////////////////////////////////////
/*
Service: FileHandlerService
Description: This Service is used to handle uploaded files. It checks if they are valid and converts them to base64 strings
Interfaces:
  fileResult: stores the data of a processed file
    error: contains an error message if something went wrong
    isSaved: boolean is true when the file is succesfully converted
    dataBase64: contains the base 64 converted data
    name: contains the file name
    type: contains the fileType
      Can be Picture or Document
Functions:
  fileHandler:
    params:
      fileInput: file Input field value
      fileType: fileType
    returns:
      an Observable with the fileResults
*/
///////////////////////////////////////////////////
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

export type FileType = 'Picture' | 'Document';

@Injectable({
  providedIn: 'root',
})
export class FileHandlerService {
  constructor() {}

  fileHandler(fileInput, fileType: FileType): Observable<fileResult> {
    let results: fileResult = {
      //default file Results
      error: '',
      isSaved: false,
      dataBase64: '',
      name: '',
      type: fileType,
    };

    results.error = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      //Check if Files
      let max_size;
      let allowed_types;
      let forbidden_types;
      let max_height;
      let max_width;
      if (fileType == 'Picture') {
        //If Picture Set Picture limits
        // Size Filter Bytes
        max_size = environment.pictureLimits.maxSize;
        allowed_types = environment.pictureLimits.allowedTypes;
        max_height = environment.pictureLimits.maxHeight;
        max_width = environment.pictureLimits.maxWidth;
      } else if (fileType == 'Document') {
        //If document set document limits
        max_size = environment.fileLimits.maxSize;
        forbidden_types = environment.fileLimits.forbiddenTypes;
      }

      if (fileInput.target.files[0].size > max_size) {
        //Check for size
        results.error = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return Observable.create((observer) => {
          observer.next(results);
          observer.complete();
        });
      }

      if (fileType == 'Picture') {
        //Check allowed types when it is a picture
        if (!allowed_types.includes(fileInput.target.files[0].type)) {
          results.error = `Only these FileTypes are allowd: ( ${allowed_types.toString()} )`;
          return Observable.create((observer) => {
            observer.next(results);
            observer.complete();
          });
        }
      } else if (fileType == 'Document') {
        //Check forbidden types when it is a document
        if (forbidden_types.includes(fileInput.target.files[0].type)) {
          results.error = `Sorry these file types are forbidden: ( ${allowed_types.toString()} )`;
          return Observable.create((observer) => {
            observer.next(results);
            observer.complete();
          });
        }
      }

      results.name = fileInput.target.files[0].name; // set file name

      const reader = new FileReader();
      return Observable.create((observer) => {
        //create and return observable
        reader.onload = (e: any) => {
          if (fileType == 'Picture') {
            //make additional size checks when it is Picture
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
                results.dataBase64 = e.target.result; //set base 64 data
                results.isSaved = true;
                observer.next(results);
                observer.complete();
              }
            };
          } else if (fileType == 'Document') {
            results.dataBase64 = e.target.result; //set base 64 data
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
