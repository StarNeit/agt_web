import { createSelector } from "@ngrx/store";
import { IStore } from '../../interfaces/store.interface';

export const selectFeature = (state: IStore) => state.activity;

export const activitiesSelector = createSelector(
    selectFeature,
    (state) => state.activities
);
