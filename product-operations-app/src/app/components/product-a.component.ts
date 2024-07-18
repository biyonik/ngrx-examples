import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductState } from '../state/product.state';
import { Store } from '@ngrx/store';
import { ProductModel } from '../models';
import {
  getError,
  getProductById,
  getProducts,
} from '../state/product.selector';
import {
  productAddAction,
  productLoadAction,
  productRemoveAction,
  productUpdateAction,
} from '../state/product.actions';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-a-product',
  imports: [ReactiveFormsModule],
  template: `
    <div>
      <h1>Product-A</h1>
      <button class="add-product" (click)="addProduct()">
        Add New Product
      </button>
      <hr />
      @if (showUpdateForm()) {
      <div ngIf>
        <form [formGroup]="updateForm">
          <div>
            <label for="name">Name</label>
            <input name="name" formControlName="name" id="name" />
          </div>
          <div>
            <label for="price">Price</label>
            <input name="price" formControlName="price" id="price" />
          </div>
          <div>
            <button (click)="handleSaveChanges()">Save Changes</button>
          </div>
        </form>
      </div>
      }
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
              <button>Detail</button>
              <button (click)="handleUpdate(product.id)">Update</button>
              <button (click)="handleRemove(product.id)">Remove</button>
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
  styles: [
    `
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

        th,
        td {
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
    `,
  ],
})
export default class ProductAComponent implements OnInit, OnDestroy {
  private readonly store: Store<ProductState> = inject(Store<ProductState>);
  protected readonly productList: WritableSignal<ProductModel[]> = signal<
    ProductModel[]
  >([]);
  private subscription: Subscription | null = null;
  protected readonly showUpdateForm: WritableSignal<boolean> =
    signal<boolean>(false);
  protected readonly selectedProduct: WritableSignal<ProductModel | undefined> =
    signal<ProductModel | undefined>(undefined);

  private formBuilder = inject(FormBuilder);
  protected updateForm: FormGroup<any>;

  constructor() {
    this.updateForm = this.formBuilder.group({
      name: new FormControl(''),
      price: new FormControl(''),
    });

    effect(() => {
      const product = this.selectedProduct();

      this.updateForm.patchValue({
        name: product?.name,
        price: product?.price,
      });
    });
  }

  ngOnInit(): void {
    this.store.select(getError).subscribe((x) => {
      if (x !== undefined) {
        alert('Products not loaded from API resource!');
      }
    });

    this.store.dispatch(productLoadAction());

    this.store.select(getProducts).subscribe((productList) => {
      this.productList.set(productList);
    });
  }

  lastId = computed(() => this.productList()?.length + 1);

  addProduct() {
    const price = Math.floor(Math.random() * 100) + 1;
    this.store.dispatch(
      productAddAction({
        Product: {
          id: this.lastId(),
          name: 'Product ' + this.lastId(),
          price: price,
        },
      })
    );
  }

  handleUpdate(id: number | string) {
    this.store
      .select(getProductById(id))
      .subscribe((product) => this.selectedProduct.set(product));

    console.log(this.selectedProduct());

    if (this.showUpdateForm() === false) {
      this.showUpdateForm.update(() => true);
    }
  }

  handleSaveChanges() {
    const formData = this.updateForm.value;

    this.store.dispatch(
      productUpdateAction({
        Product: {
          id: this.selectedProduct()?.id,
          ...formData,
        },
      })
    );
  }

  handleRemove(id: number | string) {
    if (confirm('Are you sure delete this record?')) {
      this.store.dispatch(
        productRemoveAction({
          IdForUpdate: id,
        })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
