import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductState } from '../state/product.state';
import { Store } from '@ngrx/store';
import { ProductModel } from '../models';
import { getProducts } from '../state/product.selector';
import { productAddAction } from '../state/product.actions';

@Component({
  standalone: true,
  selector: 'app-a-product',
  template: ` 
    <div>
      <h1>Product-A</h1>
      <button
        class="add-product"
        (click)="addProduct()"
      >
        Add New Product
      </button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (product of this.productList(); track product.id) {
            <tr>
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>
                <button
                >
                  Detail
                </button>
                <button
                >
                  Update
                </button>
                <button
                >
                  Remove
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4">No Products</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .add-product {
      margin-bottom: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .add-product:hover {
      background-color: #0069d9;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      border: 1px solid #ccc;

      thead tr th {
        font-weight: bold;
        text-align: center;
      }

      tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      tbody tr:hover {
        background-color: #ddd;
      }

      tbody tr td {
        border: 1px solid #ccc;
      }

      tbody tr td:last-child {
        text-align: center;
      }

      tbody tr td button {
        border: none;
        background-color: transparent;
        color: #007bff;
        font-size: 14px;
        cursor: pointer;
      }

      tbody tr td button:hover {
        text-decoration: underline;
      }

      th, td {
        padding: 10px;
      }

      th {
        background-color: #f2f2f2;
      }

      td {
        text-align: center;
      }

      button {
        margin-right: 5px;
      }

      button:last-child {
        margin-right: 0;
      }

      button:hover {
        cursor: pointer;
      }
    }
  `],
})
export default class ProductAComponent implements OnInit {
  private readonly store: Store<ProductState> = inject(Store<ProductState>);
  protected readonly productList: WritableSignal<ProductModel[]> = signal<ProductModel[]>([]);
  constructor() {}

  ngOnInit(): void {
    this.store.select(getProducts).subscribe((productList) => {
      this.productList.set(productList);
    });
  }

  lastId = computed(() => this.productList()?.length + 1);

  addProduct() {
    const price = Math.floor(Math.random() * 100) + 1;
    this.store.dispatch(productAddAction({ Product: { id: this.lastId(), name: 'Product ' + this.lastId(), price: price } }));
  }

}
