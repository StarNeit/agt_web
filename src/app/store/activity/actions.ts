import { createAction, props } from "@ngrx/store";
import { IActivity } from '../../interfaces/activity.interface';

export const addActivity = createAction('[Activity] Add Activity', props<{ value: IActivity }>());
