import { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TopNav from "../layout/TopNav";
import { setBoardList, setBoardNum, setMode } from "../reducer/MainSlice";
import BoardDetail from "./component/BoardDetail";
import BoardDetailModal from "./component/BoardDetailModal";
import BoardList from "./component/BoardList";
import BoardModify from "./component/BoardModify";
import BoardWriter from "./component/BoardWriter";


const BoardConatiner = ({}) => {

    const { mode, arrBoard, boardNum } = useSelector(state => ({mode: state.mode, arrBoard: state.boardList, boardNum: state.boardNum}));
    const dispatch = useDispatch();

    // 모달창 visible 여부
    const [showModal, setShowModal] = useState(false);

    // 선택 게시물 번호
    const [selectNum, setSelectNum] = useState(0);

    // 선택 게시글 객체
    const [objDetailInfo, setObjDetailInfo] = useState({});

    const writeBtnClick = () => {
        dispatch(setMode("write"));
    };

    useEffect(() => {
        if (!showModal) {
            dispatch(setBoardNum(0));
        }
    }, [showModal])

    useEffect(() => {
        dispatch(setBoardList([
            {
                num: 1,
                title: "제목1",
                writer: "작성자1",
                content: "게시물1게시물1",
                writeDt: "2024-06-13",
            },
            {
                num: 2,
                title: "제목2",
                writer: "작성자2",
                content: "게시물2게시물2",
                writeDt: "2024-06-09",
            },
            {
                num: 3,
                title: "제목3",
                writer: "작성자3",
                content: "게시물3게시물3",
                writeDt: "2024-06-08",
            }
        ]));
    }, []);

    useEffect(() => {
        if (boardNum) {
            // dispatch(setBoardNum(selectNum));
            setObjDetailInfo(arrBoard[boardNum-1]);
            setShowModal(true);
        }
    }, [boardNum]);

    return (
        <>
        <TopNav />
        {/* 모드가 리스트 이면 리스트 관련 컴포넌트 조회 */}
        {mode === "list" ? 
            <>
            <Container className="mt-5">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>리액트 테스트 게시물</p>
                    </blockquote>
                </figure>

                <Nav style={{float: "left"}}>
                    <p>[총 {arrBoard?.length}개]</p>
                </Nav>
                <Nav style={{float: "right"}}>
                    <Button onClick={writeBtnClick} size="sm">글쓰기</Button>
                </Nav>
                    

                <BoardList
                    arrBoard={arrBoard}
                    setSelectNum={setSelectNum}
                    />

            </Container>
            </>

        //  모드가 글 작성
        : mode === "write" ?
            <BoardWriter />

        // 모드가 상세보기
        : mode === "modify" ?
            <BoardModify />
        : "11"
        }

        <BoardDetailModal
            showModal={showModal}
            setShowModal={setShowModal}
            objBoardInfo={objDetailInfo}
            />
        </>
    );
}

export default BoardConatiner;