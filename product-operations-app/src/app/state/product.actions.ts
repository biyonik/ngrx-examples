import { createAction, props } from '@ngrx/store';
import {
  productAddActionTypeName,
  productRemoveActionTypeName,
  productUpdateActionTypeName,
  productUpdateCurrencyActionTypeName,
} from './product.action-types';
import { ProductModel } from '../models';
import { Currency } from '../models/curreny.model';

interface ProductProps {
  Product: ProductModel;
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
