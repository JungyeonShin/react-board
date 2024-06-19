import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Nav, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ToastEditor } from "../../comm/ToastEditor";
import { setBoardList, setMode } from "../../reducer/MainSlice";
import { objChnage } from "../../util/common";

/**
 * 게시글 등록 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const BoardWriter = ({}) => {

    const dispatch = useDispatch();
    const { mode, boardList } = useSelector(state => ({mode: state.mode, boardList: state.boardList}));

    const [boardInfo, setBoardInfo] = useState({
        title: "",
        writer: "",
        content: "",
        writeDt: "",
    });

    useEffect(() => {
        if (mode === "write") {
            const today = new Date();
            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + (today.getDay() + 1)).slice(-2);

            objChnage(`${year}-${month}-${day}`, "writeDt", setBoardInfo);
        }
    }, []);

    // 뒤로가기버튼 클릭 이벤트
    const historyBack = () => {
        const arrExist = Object.keys(boardInfo)?.filter(item => {
            if (item !== "writeDt") {
                return boardInfo[item];
            }
        });

        if (arrExist?.length) {
            Swal.fire({
                icon: "question",
                html: "입력한 값이 존재합니다.<br>리스트로 이동하시겠습니까?",
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: "리스트 이동",
                cancelButtonText: "취소",
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(setMode("list"));
                }
            });
        } else {
            dispatch(setMode("list"));
        }
    };

    // 초기화버튼 클릭 이벤트
    const boardInit = () => {
        const arrExist = Object.keys(boardInfo)?.filter(item => {
            if (item !== "writeDt") {
                return boardInfo[item];
            }
        });

        if (arrExist?.length) {
            Swal.fire({
                icon: "question",
                html: "입력된 값이 모두 사라집니다.<br>초기화 하시겠습니까?",
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: "초기화",
                cancelButtonText: "취소",
            }).then(result => {
                if (result.isConfirmed) {
                    Object.keys(boardInfo)?.map(item => {
                        if (item !== "writeDt") {
                            objChnage("", item, setBoardInfo);
                        }
                    });
                }
            });
        }

    };

    // 등록버튼 클릭 이벤트
    const boardSave = () => {
        
        // 밸레데이션에 문제있으면 리턴
        if (!validator()) {
            return;
        }

        const arrTemp = [...boardList];
        const maxNum = arrTemp.reduce((prev, value) => {
            return prev.num >= value.num ? prev.num : value.num;
        }) + 1;
        
        const objAdd = {
            num: maxNum,
            title: boardInfo.title,
            writer: boardInfo.writer,
            content: boardInfo.content,
            writeDt: boardInfo.writeDt
        };

        arrTemp.push(objAdd);
        dispatch(setBoardList(arrTemp));

        Swal.fire({
            icon: "success",
            text: "저장이 완료되었습니다.",
            allowOutsideClick: false
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(setMode("list"));
            }
        });
    };

    // 입력 양식 밸리데이터 체크
    const validator = () => {
        let msg = "";
        if (!boardInfo.title.trim()) {
            msg = "제목을 입력해 주세요.";
        } else if (!boardInfo.writer.trim()) {
            msg = "작성자를 입력해 주세요.";
        } else if (!boardInfo.content.trim()) {
            msg = "내용을 입력해 주세요.";
        }

        if (msg) {
            Swal.fire({
                icon: "error",
                text: msg,
                allowOutsideClick: false
            });
            return false;
        }
        return true;
    }

    return (
        <>

        <Container className="mt-5">
            {/* <Form.Label>제목</Form.Label> */}
            

            <Form className="ml-10" autoComplete="off">
                <Form.Group className="mb-3" controlId="inputTitle">
                    <Form.Label>제목</Form.Label>
                    <FloatingLabel
                        controlId="floatingTitle"
                        label="제목을 입력해주세요."
                        className="mb-3"
                        >
                    <Form.Control 
                        type="text"
                        placeholder="제목을 입력해주세요."
                        onChange={(e) => objChnage(e.target.value, "title", setBoardInfo)}
                        value={boardInfo?.title}
                        autoComplete="off"
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputWriter">
                    <Form.Label>작성자</Form.Label>
                    <FloatingLabel
                        controlId="floatingWriter"
                        label="작성자를 입력해주세요."
                        className="mb-3"
                        >
                    <Form.Control
                        type="text"
                        placeholder="작성자를 입력해주세요."
                        onChange={(e) => objChnage(e.target.value, "writer", setBoardInfo)}
                        value={boardInfo.writer}
                        autoComplete="off"
                        />
                    </FloatingLabel>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="inputContent">
                    <Form.Label>내용</Form.Label>
                    <FloatingLabel
                        controlId="floatingContent"
                        label="내용을 입력해주세요."
                        className="mb-3"
                        >
                    <Form.Control as="textarea" 
                        placeholder="작성자를 입력해주세요."
                        onChange={(e) => objChnage(e.target.value, "content", setBoardInfo)}
                        value={boardInfo.content}
                        style={{height: "150px"}} />
                    </FloatingLabel>
                </Form.Group> */}

                <ToastEditor
                    body={setBoardInfo}
                    setBody={setBoardInfo}
                    />
            </Form>

            <Nav style={{float: "right"}}>
                <Button variant="danger" onClick={historyBack}>뒤로가기</Button>
                &nbsp;
                <Button variant="warning" onClick={boardInit}>초기화</Button>
                &nbsp;
                <Button variant="primary" onClick={boardSave} >등록</Button>
            </Nav>
            
        </Container>
        </>
    );
};

export default BoardWriter;