import {signInReducer} from "./reducer";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import loginSaga from "./saga";

export const initialState = {
    signInStatus: {
        requestDone:false
    },
};
