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
import { SetUserId } from './app.action';

export type SearchType = 'gifs' | 'stickers';

export interface AppStateModel {
  userId: string;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    userId: null,
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
}
