import { createAction } from "@ngrx/store";

export const actionIncreaseCounter = createAction("[Counter] Increase");
export const actionDecreaseCounter = createAction("[Counter] Decrease");