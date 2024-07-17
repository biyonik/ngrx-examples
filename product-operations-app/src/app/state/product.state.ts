import { ProductModel } from '../models';
import { Currency } from '../models/curreny.model';

export interface AppState {}

export interface ProductState extends AppState {
  productList: ProductModel[];
  currency: Currency;
}
