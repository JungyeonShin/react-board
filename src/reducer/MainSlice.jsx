import { createSlice } from "@reduxjs/toolkit"

export const MainSlice = createSlice({
    name: 'counter',
    initialState: { 
        value: 0,
        mode: "list",
        boardNum: 0,
        boardList: [],
    },
    reducers: {
        plus: state => {
            state.value += 1
        },
        minus: state => {
            state.value -= 1
        },

        // 게시판 리스트, 글쓰기 전환 관련 상태값
        setMode: (state, { payload }) => {
            state.mode = payload;
        },

        // 게시글 번호
        setBoardNum: (state, { payload }) => {
            state.boardNum = payload;
        },

        // 게시판 리스트 정보 세팅
        setBoardList: (state, { payload }) => {
            console.log("셋 : ", payload);
            state.boardList = payload;
        },
    },
});

export const { plus, minus, setMode, setBoardNum, setBoardList } = MainSlice.actions; 
export default MainSlice.reducer;