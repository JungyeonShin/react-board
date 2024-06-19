import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TopNav from "../layout/TopNav";
import BoardList from "./BoardList";
import { setBoardList } from "../reducer/MainSlice";

const MainContainer = ({}) => {

    const count = useSelector(state => state.value);
    const dispatch = useDispatch();

    const [arrBoard, setArrBoard] = useState([]);

    const writeBtnClick = () => {
        
    };

    useEffect(() => {
        setArrBoard([
            {
                num: 1,
                title: "제목1",
                writer: "작성자1",
                writeDt: "2024-06-13",
            },
            {
                num: 2,
                title: "제목2",
                writer: "작성자2",
                writeDt: "2024-06-09",
            },
            {
                num: 3,
                title: "제목3",
                writer: "작성자3",
                writeDt: "2024-06-08",
            }
        ]);
    }, []);

    return (
        <>
        <TopNav />
        <BoardList arrBoard={arrBoard} />
        <Container fluid>
            <Row>
                <Col sm={11}></Col>
                <Col sm={1}><Button onClick={writeBtnClick}>글쓰기{count}</Button></Col>
            </Row>
            
        </Container>
        </>
    );
}

export default MainContainer;