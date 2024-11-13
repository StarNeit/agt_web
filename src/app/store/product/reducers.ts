import { createReducer, on } from "@ngrx/store";

import * as ProductActions from "./actions";
import { ProductsData } from '../../data/products.data';
import { IProduct } from '../../interfaces/product.interface';

const initialProducts = window.localStorage.getItem('products');

export interface IProductState {
  products: IProduct[];
}

export const initialState: IProductState = {
  products: initialProducts ? JSON.parse(initialProducts) : ProductsData,
};

export const reducers = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, action) => {
    const payload = [...state.products, action.value];
    window.localStorage.setItem('products', JSON.stringify(payload));

    return {
      ...state,
      products: payload
    }
  }),
  on(ProductActions.updateProduct, (state, action) => {
    const updatedProducts = state.products.map((item) =>
      item.id === action.id ? action.value : item,
    );
    window.localStorage.setItem('products', JSON.stringify(updatedProducts));

    return {
      ...state,
      products: updatedProducts
    }
  }),
  on(ProductActions.deleteProduct, (state, action) => {
    const updatedProducts = state.products.filter((item) => item.id !== action.id);
    window.localStorage.setItem('products', JSON.stringify(updatedProducts));

    return {
      ...state,
      products: updatedProducts
    }
  }),
);
