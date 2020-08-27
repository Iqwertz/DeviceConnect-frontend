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
import {
  SetUserId,
  SetSessionId,
  SetUserName,
  SetUserInSession,
} from './app.action';
import { UserData } from '../pages/session/session.component';
import { SetSearchTerm } from './app.action';

export type SearchType = 'gifs' | 'stickers';

export interface AppStateModel {
  userId: string;
  sessionId: string;
  userName: string;
  userInSession: Map<string, UserData>;
  searchTerm: string;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    userId: null,
    sessionId: '0000',
    userName: null,
    userInSession: new Map<string, UserData>(),
    searchTerm: 'this',
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

  @Selector()
  static userName(state: AppStateModel) {
    return state.userName;
  }

  @Action(SetUserName)
  setUserName(context: StateContext<AppStateModel>, action: SetUserName) {
    context.patchState({
      userName: action.userName,
    });
  }

  @Selector()
  static userInSession(state: AppStateModel) {
    return state.userInSession;
  }

  @Action(SetUserInSession)
  setUserInSession(
    context: StateContext<AppStateModel>,
    action: SetUserInSession
  ) {
    context.patchState({
      userInSession: action.userInSession,
    });
  }

  @Selector()
  static searchTerm(state: AppStateModel) {
    return state.searchTerm;
  }

  @Action(SetSearchTerm)
  setSearchTerm(context: StateContext<AppStateModel>, action: SetSearchTerm) {
    context.patchState({
      searchTerm: action.searchTerm,
    });
  }
}
