//////Use
/*
  @Select(AppState.userId)
  userId$;

  ngOninit:
    this.userId$.subscribe((userId: string) => {
      this.userId = userId;
    });

  Set:
  constructor: private store: Store

  this.store.dispatch(new SetUserId(x));
*/

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetUserId, SetSessionId } from './app.action';

export type SearchType = 'gifs' | 'stickers';

export interface AppStateModel {
  userId: string;
  sessionId: string;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    userId: null,
    sessionId: '0000',
  },
})
export class AppState {
  @Selector()
  static userId(state: AppStateModel) {
    return state.userId;
  }

  @Action(SetUserId)
  setUserId(context: StateContext<AppStateModel>, action: SetUserId) {
    context.patchState({
      userId: action.userId,
    });
  }

  @Selector()
  static sessionId(state: AppStateModel) {
    return state.sessionId;
  }

  @Action(SetSessionId)
  setSessionId(context: StateContext<AppStateModel>, action: SetSessionId) {
    context.patchState({
      sessionId: action.sessionId,
    });
  }
}
