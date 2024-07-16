import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../../state/app.state';
import { getCounterSelector } from '../../state/app.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-second-counter',
  standalone: true,
  imports: [],
  template: `
    <div class="counter">
      <h1>Second Counter</h1>
      <h2>{{counter()}}</h2>
    </div>
  `,
  styles: [``]
})
export class SecondCounterComponent implements OnInit, OnDestroy {
  
  private readonly store = inject(Store<CounterState>)
  private subscription: Subscription | null = null;
  counter: WritableSignal<number> = signal<number>(0)


  constructor() {}

  ngOnInit(): void {
    this.subscription = this.store.select(getCounterSelector).subscribe((counter) => {
      console.log('second counter :: => ', counter);
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}