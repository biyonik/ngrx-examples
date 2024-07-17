import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState, UserState } from "./app.state";

const getCounterState = createFeatureSelector<CounterState>("counterStoreSlice");

export const getCounterSelector = createSelector(getCounterState, (state: CounterState) => state.Counter)

const getUserState = createFeatureSelector<UserState>("userStoreSlice");
export const getUserSelector = createSelector(getUserState, (state: UserState) => state.User)