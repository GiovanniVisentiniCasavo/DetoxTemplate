import {initialState} from './state';

import {createAction, createReducer} from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import loginSaga from "./saga";


const SIGN_IN_LOGIN_NEEDED = 'signIn/loginNeeded';
const SIGN_IN_LOGIN_REQUEST = 'signIn/loginRequest';
const SIGN_IN_LOGIN_COMPLETE = 'signIn/loginComplete';


export const loginStatusSelector = (state) => state.signInStatus;

export const buildLoginNeededAction = createAction<void, typeof SIGN_IN_LOGIN_NEEDED>(SIGN_IN_LOGIN_NEEDED);
export const buildLoginRequestAction = createAction<void, typeof SIGN_IN_LOGIN_REQUEST>(SIGN_IN_LOGIN_REQUEST);
export const buildLoginCompleteAction = createAction<void, typeof SIGN_IN_LOGIN_COMPLETE>(SIGN_IN_LOGIN_COMPLETE);

export const signInReducer = createReducer(initialState.signInStatus, (builder) =>
    builder
        .addCase(buildLoginNeededAction, (state) => {
            state.requestDone=false;
        })
        .addCase(buildLoginRequestAction, (state, action) => {
            state.requestDone=true;
        })
);

const rootReducer = {
    signInStatus: signInReducer,
};

export const configureStore = (): Store => {
    const middleware = [];
    const sagaMiddleware = createSagaMiddleware();

    middleware.push(sagaMiddleware);
    if (process.env.NODE_ENV !== 'production') {
        //middleware.push(createLogger());
    }

    const store = createStore(
        combineReducers(rootReducer),
        applyMiddleware(...middleware),
    );

    sagaMiddleware.run(loginSaga);
    return store;
};
