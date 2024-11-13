import { createSelector } from "@ngrx/store";
import { IStore } from '../../interfaces/store.interface';

export const selectFeature = (state: IStore) => state.user;

export const usersSelector = createSelector(
    selectFeature,
    (state) => state.users
);
