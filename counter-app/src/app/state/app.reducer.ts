import { createReducer, on } from "@ngrx/store";
import { CounterState } from "./app.state";
import { actionDecreaseCounter, actionIncreaseCounter } from "./app.actions";

const initialState: CounterState = {Counter: 0}

export const counterReducer = createReducer<CounterState>(initialState, 
    on(actionIncreaseCounter, (state): CounterState => {
        return {...state, Counter: state.Counter + 1}
    }),
    on(actionDecreaseCounter, (state): CounterState => {
        return {...state, Counter: state.Counter - 1}
    })
)