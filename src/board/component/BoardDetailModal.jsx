import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useState } from "react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setBoardNum, setMode } from "../../reducer/MainSlice";


/**
 * 게시글 상세보기 모달 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const BoardDetailModal = ({
    showModal,
    setShowModal,
    objBoardInfo,
}) => {

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setBoardNum(0));
        setShowModal(false);
    }

    // 수정 버튼 클릭 이벤트
    const onModifyBtn = () => {
       setShowModal(false);
       dispatch(setMode("modify"));
    }

    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            animation={true}
            backdrop={"static"}
            >
            <Modal.Header closeButton>
                <ModalTitle>{objBoardInfo?.title}</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form className="ml-10" autoComplete="off">
                    <Form.Group className="mb-3" controlId="inputWriter">
                        <Form.Label>작성자</Form.Label>
                        <Form.Control
                            type="text"
                            value={objBoardInfo?.writer}
                            autoComplete="off"
                            readOnly
                            />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="inputContent">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            defaultValue={objBoardInfo?.content}
                            style={{height: "150px"}}
                            readOnly />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="inputContent">
                    <Form.Label>내용</Form.Label>
                    <div style={{border: "var(--bs-border-width) solid var(--bs-border-color)",
                        borderRadius: "var(--bs-border-radius)",
                        padding: ".375rem .75rem",
                        lineHeight: "1.5",
                        backgroundColor: "var(--bs-body-bg)"}}>
                    <Viewer
                        initialValue={objBoardInfo?.content}
                        />
                    </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={onClose}>닫기</Button>
                <Button variant="primary" size="sm" onClick={onModifyBtn}>수정</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default BoardDetailModal;