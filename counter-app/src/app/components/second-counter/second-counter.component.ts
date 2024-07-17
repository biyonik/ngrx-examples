import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState, UserState, UserStateModel } from '../../state/app.state';
import { getCounterSelector, getUserSelector } from '../../state/app.selector';
import { Subscription } from 'rxjs';
import { actionDecreaseCounter, actionIncreaseCounter, actionUpdateUserState } from '../../state/app.actions';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-second-counter',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="counter">
      <h1>Second Counter</h1>
      <h2>{{counter()}}</h2>
      <button (click)="increaseCounter()">Increase</button>
      <button (click)="decreaseCounter()">Decrease</button>

      <div>
        <h3>User Info - {{user() | json}}</h3>
        <button (click)="updateUserInfo()">Update User</button>
      </div>
    </div>
  `,
  styles: [``]
})
export class SecondCounterComponent implements OnInit, OnDestroy {
  
  private readonly store = inject(Store<CounterState>)
  private readonly userStore = inject(Store<UserState>)
  private subscription: Subscription | null = null;
  counter: WritableSignal<number> = signal<number>(0)
  user: WritableSignal<UserStateModel | null> = signal<UserStateModel | null>(null)


  constructor() {}

  ngOnInit(): void {
    this.subscription = this.store.select(getCounterSelector).subscribe((counter) => {
      this.counter.update(() => counter)
    })

    this.userStore.select(getUserSelector).subscribe((user) => {
      this.user.update(() => user)
    })
  }

  increaseCounter() {
    this.store.dispatch(actionIncreaseCounter());
  }

  decreaseCounter() {
    this.store.dispatch(actionDecreaseCounter());
  }

  updateUserInfo() {
    this.userStore.dispatch(actionUpdateUserState({
      user: {
        id: "2",
        username: "johndoe",
        email: "john@doe.com"
      }
    }));
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}