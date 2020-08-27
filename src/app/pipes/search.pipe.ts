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
      value = value.replace(q, mark);
      return value;
    } else {
      return value;
    }
  }
}
