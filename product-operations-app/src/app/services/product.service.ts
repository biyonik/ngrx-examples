import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductModel } from '../models';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

const API_URL = `https://jsonplaceholder.typicode.com/posts`;

@Injectable({
  providedIn: 'root',
})
export default class ProductService {
  private readonly httpClient = inject(HttpClient);

  getAll(): Observable<ProductModel[]> {
    return this.httpClient
      .get<any[]>(API_URL)
      .pipe(map((data) => data.map(this.transformData)));
  }

  private transformData(item: any): ProductModel {
    return {
      id: item.id,
      name: item.title,
      price: Math.floor(Math.random() * 100) + 1,
    };
  }
}
