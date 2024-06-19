import { useEffect } from "react";
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBoardNum, setMode } from "../../reducer/MainSlice";


const BoardList = ({
    arrBoard,
    setSelectNum,
}) => {

    const dispatch = useDispatch();

    const goToDetail = (num) => {
        dispatch(setBoardNum(num));
    };

    return (
        <>
            <Table striped bordered hover
                size="sm"
                className="table caption-top table-sm"
                >
                {/* <caption>[총 {arrBoard?.length}개]</caption> */}
                <thead className="table-light">
                    <tr>
                        <th style={{width: "10%", textAlign: 'center'}}>순번</th>
                        <th style={{width: "60%", textAlign: 'center'}}>제목</th>
                        <th style={{width: "20%", textAlign: 'center'}}>작성자</th>
                        <th style={{width: "10%", textAlign: 'center'}}>작성일</th>
                    </tr> 
                </thead>
                <tbody>
                    {
                        arrBoard ?
                            arrBoard?.map((item, index) => {
                                return (
                                    <tr key={item?.num + '-' + index}>
                                        <td scope="row" style={{textAlign: 'center'}}>{item?.num}</td>
                                        <td style={{paddingLeft: '2%', paddingRight: '2%'}}><Button variant="link" size="sm" onClick={(e) => goToDetail(item?.num)}>{item?.title}</Button></td>
                                        <td style={{paddingLeft: '2%', paddingRight: '2%'}}>{item?.writer}</td>
                                        <td style={{textAlign: 'center'}}>{item?.writeDt}</td>
                                    </tr>
                                )
                            })
                         : ""
                    }
                </tbody>
            </Table>
        </>
    );
};

export default BoardList;

