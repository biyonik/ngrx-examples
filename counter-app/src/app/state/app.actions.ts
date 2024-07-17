import { createAction, props } from "@ngrx/store";
import { UserStateModel } from "./app.state";

export const actionIncreaseCounter = createAction("[Counter] Increase");
export const actionDecreaseCounter = createAction("[Counter] Decrease");

export const actionUpdateUserState = createAction("[User] Update", props<{user: UserStateModel}>());