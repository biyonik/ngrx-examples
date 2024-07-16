import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { actionDecreaseCounter, actionIncreaseCounter } from "./app.actions";

const initialState: AppState = {Counter: 0}

export const counterReducer = createReducer<AppState>(initialState, 
    on(actionIncreaseCounter, (state): AppState => {
        return {...state, Counter: state.Counter + 1}
    }),
    on(actionDecreaseCounter, (state): AppState => {
        return {...state, Counter: state.Counter - 1}
    })
)