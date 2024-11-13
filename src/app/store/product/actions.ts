import { createAction, props } from "@ngrx/store";
import { IProduct } from '../../interfaces/product.interface';

export const getProducts = createAction('[Products] Get Products');

export const addProduct = createAction('[Products] Set Product', props<{ value: IProduct }>());

export const updateProduct = createAction('[Products] Update Product', props<{ id: string, value: IProduct }>());

export const deleteProduct = createAction('[Products] Delete Product', props<{ id: string }>());
