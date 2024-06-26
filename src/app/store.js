import createSagaMiddleware from "@redux-saga/core";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { boardSaga, boardSlice } from "../board/boardReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

export const history = createBrowserHistory();

const createRootReducer = (history) =>

    combineReducers({
        router: connectRouter(history),
        boardReducer: boardSlice.reducer,

    });


export function* rootSaga() {
    yield all([
        boardSaga(),
    ]);
}

const sagaMiddleware = createSagaMiddleware();

export const createPrjStore = function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), sagaMiddleware)
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
