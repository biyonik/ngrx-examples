import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../../state/app.state';
import { getCounterSelector } from '../../state/app.selector';
import { Subscription } from 'rxjs';
import { actionDecreaseCounter, actionIncreaseCounter } from '../../state/app.actions';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  template: `
    <div class="counter">
      <h1>First Counter</h1>
      <h2>{{counter()}}</h2>
      <button (click)="increaseCounter()">Increase</button>
      <button (click)="decreaseCounter()">Decrease</button>
    </div>
  `,
  styles: [``]
})
export class CounterComponent implements OnInit, OnDestroy {
  
  private readonly store = inject(Store<CounterState>)
  private subscription: Subscription | null = null;
  counter: WritableSignal<number> = signal<number>(0)


  constructor() {}

  ngOnInit(): void {
    this.subscription = this.store.select(getCounterSelector).subscribe((counter) => {
      this.counter.update(() => counter)
    })
  }

  increaseCounter() {
    this.store.dispatch(actionIncreaseCounter());
  }

  decreaseCounter() {
    this.store.dispatch(actionDecreaseCounter());
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
