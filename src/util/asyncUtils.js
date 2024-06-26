import { call, put } from "redux-saga/effects";

/**
 * reducer에서 수행할 action을 정의
 * @param type
 * @returns {{success: string, error: string}}
 */
export const reducerUtils = {
    init: () => ({
      data: null,
      loading: false,
      error: false,
      errorMessage: null,
    }),
  
    loading: (prevData = null) => ({
      data: prevData,
      loading: true,
      error: false,
      errorMessage: null,
    }),
  
    success: (data = null) => ({
      data: data,
      loading: false,
      error: false,
      errorMessage: null,
    }),
  
    error: (error) => ({
      data: null,
      loading: false,
      error: true,
      errorMessage: error.msg,
    }),
};

/**
 *
 * 비동기통신을 위한 기본 리듀서 생성 메소드
 *
 * @param {string:{}} actions action 키값만 사용.
 * @returns {{}}
 */
export const makeReducer  = (actions)=>{
    return Object.keys(actions).reduce((prev, key) => ({
      ...prev,
      [key.split('/')[1]]: (s, a) => {}
    }), {})
}

 export const createActionsState = (action, actions) => {
    let actionState = null;
  
    if (action && actions) {
        if (action.payload && action.payload.target) {
            actionState = action.payload.target;
        } else {
            for (const [stateKey, { key }] of Object.entries(actions)) {
                if (!stateKey)
                    continue
                if (action.type && action.type.startsWith(stateKey)) {
                    actionState = key;
                }
            }
        }
    }
    return actionState;
};

export const handleAsyncAction = ({ type, payload = {} }, prevData = null) => {
    if (type.includes("Success")) return reducerUtils.success(payload.data);
    if (type.includes("Error")) return reducerUtils.error(payload);
    return reducerUtils.loading(prevData); // 3.
};

/**
 * type을 전달받아 suffix로 Success, Error를 붙인다.
 * @param type
 * @returns {{success: string, error: string}}
 */
export const createActionString = (type) => {
    return { success: `${type}Success`, error: `${type}Error` };
};
  

/**
 * Saga를 통해 비동기 통신시 수행할 action정의
 * @param type
 * @param promiseCreator
 * @param stateType
 * @returns {(function(*): Generator<SimpleEffect<"CALL", CallEffectDescriptor<* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : (* extends ((...args: any[]) => Promise<infer RT>) ? RT : (* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"CALL", CallEffectDescriptor<{[P in string]: (this:Ctx, ...args: any[]) => any}[string] extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ({[P in string]: (this:Ctx, ...args: any[]) => any}[string] extends ((...args: any[]) => Promise<infer RT>) ? RT : ({[P in string]: (this:Ctx, ...args: any[]) => any}[string] extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"CALL", CallEffectDescriptor<(this:unknown, ...args: any[]) => any extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((this:unknown, ...args: any[]) => any extends ((...args: any[]) => Promise<infer RT>) ? RT : ((this:unknown, ...args: any[]) => any extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<{payload: {[p: string]: *}|*, type: string}>>|SimpleEffect<"PUT", ChannelPutEffectDescriptor<unknown>>|SimpleEffect<"PUT", PutEffectDescriptor<{payload: {msg, stateType: null}|{msg}, type: string, error: boolean}>>, void, *>)|*}
 */
export const createRequestSaga = (type, request) => {
    const { success, error } = createActionString(type);
  
    return function* (action) {
        const target =
            action.payload && action.payload.target ? action.payload.target : null;
      
        try {
            const response = yield call(request, action.payload);
  
            const payload = target ? { ...response, target } : response; // 1.
  
            yield put({
                type: success,
                error: false,
                payload,
            });
        } catch (err) {
            const payload = target
                ? { msg: HTTP_ERROR_MSG[err.response?.status], target }
                : { msg: HTTP_ERROR_MSG[err.response?.status] }; // 2.
  
            yield put({
                type: error,
                error: true,
                payload,
            });
        }
    };
};

export const HTTP_ERROR_MSG = {
    401: "로그인이 필요한 작업입니다.",
    403: "권한이 존재하지 않습니다.",
    404: "해당 작업을 찾을 수 없습니다.",
    500: "서버 오류가 발생하였습니다.",
  };
  