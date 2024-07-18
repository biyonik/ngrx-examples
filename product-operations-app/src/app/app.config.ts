import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from './state/product.reducer';
import { provideHttpClient } from '@angular/common/http';
import ProductEffect from './state/product.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      productStoreSlice: productReducer,
    }),
    provideEffects(ProductEffect),
    provideHttpClient(),
  ],
};
