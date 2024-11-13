import { createReducer, on } from "@ngrx/store";

import * as ActivityActions from "./actions";
import { IActivity } from '../../interfaces/activity.interface';

const initialActivity = window.localStorage.getItem('activities');

export interface IActivityState {
  activities: IActivity[];
}

export const initialState: IActivityState = {
  activities: initialActivity ? JSON.parse(initialActivity) : [],
};

export const reducers = createReducer(
  initialState,
  on(ActivityActions.addActivity, (state, action) => {
    const payload = [...state.activities, action.value];
    window.localStorage.setItem('activities', JSON.stringify(payload));

    return {
      ...state,
      activities: payload
    }
  }),
);
