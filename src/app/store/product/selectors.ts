import { createSelector } from "@ngrx/store";
import { IStore } from '../../interfaces/store.interface';

export const selectFeature = (state: IStore) => state.product;

export const productsSelector = createSelector(
    selectFeature,
    (state) => state.products
);
