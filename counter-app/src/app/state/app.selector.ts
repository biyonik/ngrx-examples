import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./app.state";

const getCounterState = createFeatureSelector<CounterState>("counterStoreSlice");

export const getCounterSelector = createSelector(getCounterState, (state: CounterState) => state.Counter)