import { createAction, props } from '@ngrx/store';
import {
  productAddActionTypeName,
  productLoadActionTypeName,
  productLoadOnFailedActionTypeName,
  productLoadOnSuccessActionTypeName,
  productRemoveActionTypeName,
  productUpdateActionTypeName,
  productUpdateCurrencyActionTypeName,
} from './product.action-types';
import { ProductModel } from '../models';
import { Currency } from '../models/curreny.model';

interface ProductProps {
  Product: ProductModel;
}

interface ProductListProps {
  products: ProductModel[];
}

interface ProductRemoveProps {
  IdForUpdate: number | string;
}

interface ProductUpdateCurrencyProps {
  CurrencyForUpdate: Currency;
}

export const productAddAction = createAction(
  productAddActionTypeName,
  props<ProductProps>()
);

export const productUpdateAction = createAction(
  productUpdateActionTypeName,
  props<ProductProps>()
);

export const productRemoveAction = createAction(
  productRemoveActionTypeName,
  props<ProductRemoveProps>()
);

export const productUpdateCurrencyAction = createAction(
  productUpdateCurrencyActionTypeName,
  props<ProductUpdateCurrencyProps>()
);

export const productLoadAction = createAction(productLoadActionTypeName);
export const productLoadOnSuccessAction = createAction(
  productLoadOnSuccessActionTypeName,
  props<ProductListProps>()
);

export const productLoadOnFailedAction = createAction(
  productLoadOnFailedActionTypeName,
  props<{ error: any }>()
);
