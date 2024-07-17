import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'a',
        loadComponent: () =>
          import('./components/product-a.component').then((c) => c.default),
      },
      {
        path: 'b',
        loadComponent: () =>
          import('./components/product-b.component').then((c) => c.default),
      },
    ],
  },
];
