import { createAction, props } from "@ngrx/store";
import { IUser } from '../../interfaces/user.interface';

export const getUsers = createAction('[Users] Get Users');

export const setUsers = createAction('[Users] Set Users', props<{ users: IUser[] }>());

export const login = createAction('[Users] Login User', props<{ email: string; password: string }>());

export const loginSuccess = createAction('[Users] Login Success', props<{ users: IUser[] }>());

export const loginFailure = createAction('[Users] Login Failure', props<{ users: IUser[] }>());
