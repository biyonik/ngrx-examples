import { createReducer, on } from '@ngrx/store';
import { ProductState } from './product.state';
import {
  productAddAction,
  productRemoveAction,
  productUpdateAction,
  productUpdateCurrencyAction,
} from './product.actions';

const initialState: ProductState = {
  productList: [],
  currency: 'USD',
};

const productAddReducerItem = on(
  productAddAction,
  (state: ProductState, action): ProductState => {
    return {
      ...state,
      productList: [...state.productList, action.Product],
    };
  }
);

const productRemoveReducerItem = on(
  productRemoveAction,
  (state: ProductState, action): ProductState => {
    return {
      ...state,
      productList: state.productList.filter((x) => x.id !== action.IdForUpdate),
    };
  }
);

const productUpdateReducerItem = on(
  productUpdateAction,
  (state: ProductState, action): ProductState => {
    const updatedProductsList = state.productList.map((x) =>
      x.id === action.Product.id ? action.Product : x
    );

    return {
      ...state,
      productList: updatedProductsList,
    };
  }
);

const currencyUpdateReducerItem = on(
  productUpdateCurrencyAction,
  (state: ProductState, action): ProductState => {
    return {
      ...state,
      currency: action.CurrencyForUpdate,
    };
  }
);

export const productReducer = createReducer<ProductState>(
  initialState,
  productAddReducerItem,
  productRemoveReducerItem,
  productUpdateReducerItem,
  currencyUpdateReducerItem
);
