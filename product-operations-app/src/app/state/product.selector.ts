import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { ProductState } from './product.state';

const getProductState =
  createFeatureSelector<ProductState>('productStoreSlice');

export const getProducts = createSelector(
  getProductState,
  (state: ProductState) => state.productList
);

export const getCurrency = createSelector(
  getProductState,
  (state: ProductState) => state.currency
);

export const getProductById = (id: number | string) =>
  createSelector(getProductState, (state: ProductState) => {
    return state.productList.find((p) => p.id === id);
  });

export const getError = createSelector(
  getProductState,
  (state: ProductState) => state.error
);
