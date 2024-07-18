import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import ProductService from '../services/product.service';
import {
  productLoadAction,
  productLoadOnFailedAction,
  productLoadOnSuccessAction,
} from './product.actions';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ProductEffect {
  private readonly actions = inject(Actions);
  private readonly productService = inject(ProductService);

  loadProductsEffect = createEffect(() =>
    this.actions.pipe(
      ofType(productLoadAction),
      mergeMap(() => this.productService.getAll()),
      map((productList) =>
        productLoadOnSuccessAction({ products: productList })
      ),
      catchError((error) => {
        return of(productLoadOnFailedAction(error));
      })
    )
  );
}
