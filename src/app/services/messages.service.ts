import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  private onUpdate$$ = new BehaviorSubject<string[]>([]);
  private messages: string[] = [];
  get onUpdate$(): Observable<string[]> {
    return this.onUpdate$$.asObservable();
  }
  addMessage(msg: string) {
    this.messages.push(msg);
    this.onUpdate$$.next(this.messages);
  }
  ngOnDestroy() {
    this.onUpdate$$.complete();
  }
}
