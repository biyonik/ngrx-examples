export interface AppState {
    
}

export interface CounterState extends AppState {
    Counter: number;
}

export interface UserState extends AppState {
    User: UserStateModel;
}

export interface UserStateModel {
    id: string;
    username: string;
    email: string;
}