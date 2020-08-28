////////////////////////////////////////////
/*
Pipe: SearchPipe
use: value | search: searchTerm : messageType
description: checks if a message contains a searchterm and  if it highlites it with the mark tag, it also excludes status messages
*/
//////////////////////////////////////////

import { Pipe, PipeTransform } from '@angular/core';
import { messageType } from '../services/messages.service';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: string, q: string, t: messageType): string {
    if (value.includes(q) && t != 'status') {
      const mark = `<mark>${q}</mark>`;
      let regExp = new RegExp(q, 'g');
      value = value.replace(regExp, mark);
      return value;
    } else {
      return value;
    }
  }
}
