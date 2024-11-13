import { createReducer, on } from "@ngrx/store"

import * as UserActions from "./actions";
import { IUser } from '../../interfaces/user.interface';
import { UsersData } from '../../data/users.data';

export interface IUsersState {
  users: IUser[];
}

export const initialState: IUsersState = {
  users: UsersData,
}

export const reducers = createReducer(
  initialState,
  on(UserActions.setUsers, (state, action) => (
    {
      ...state,
      isLoading: false,
      users: action.users
    })
  ),
);
