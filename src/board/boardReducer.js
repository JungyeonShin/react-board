import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from 'redux-saga/effects'
import { createActionsState, createRequestSaga, handleAsyncAction, makeReducer, reducerUtils } from "../util/asyncUtils";
import { getMemberList } from "./boardAPI";

const prefix = "board";

const GET_MEMBER_LIST = "board/getMemberList";

const initialState = {
    'mode': "list",
    'getMemberList': reducerUtils.init(),
}

const actions = {
    [GET_MEMBER_LIST]: {
        key: "getMemberList",
        api: getMemberList
    }

}

export function * boardSaga () {
    for (const [action, { api }] of Object.entries(actions)) {
        yield takeLatest(action, createRequestSaga(action, api))
    }
}


const boardReducers = makeReducer(actions);

export const boardSlice = createSlice({
    // 액션타입의 문자 prefix
    name: prefix,

    // 초기값
    initialState,

    // 리듀서
    reducers: {
        initializeAll: (state, action) => {
            return initialState
        },
        initialize: (state, action) => {
            return {
                ...state,
                [action.payload]: reducerUtils.init(),
            }
        },
        setMode: (state, action) => {
            return {
                ...state,
                ["mode"]: action.payload,
            }
        },

        ...boardReducers
    },

    // 서버통신 리듀서
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => {
                return action.type.includes(prefix)
            },
            (state, action) => {
                state[createActionsState(action, actions)] = handleAsyncAction(action);
            }
        )
    }

});

export const boardAction = boardSlice.actions;