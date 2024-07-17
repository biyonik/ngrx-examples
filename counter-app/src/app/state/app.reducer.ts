import { createReducer, on } from "@ngrx/store";
import { CounterState, UserState } from "./app.state";
import { actionDecreaseCounter, actionIncreaseCounter, actionUpdateUserState } from "./app.actions";

const initialState: CounterState = {Counter: 0}

export const counterReducer = createReducer<CounterState>(initialState, 
    on(actionIncreaseCounter, (state): CounterState => {
        return {...state, Counter: state.Counter + 1}
    }),
    on(actionDecreaseCounter, (state): CounterState => {
        return {...state, Counter: state.Counter - 1}
    })
)

const initialUserState: UserState = {
    User: {
        id: "1",
        username: "test",
        email: "test"
    }
}

export const userReducer = createReducer<UserState>(initialUserState,
    on(actionUpdateUserState, (state, actionData): UserState => {
        return {...state, User: actionData.user}
    })
)