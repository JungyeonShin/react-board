import { useEffect } from "react";
import { Table } from "react-bootstrap"


const BoardList = ({
    arrBoard
}) => {
console.log(arrBoard)

    return (
        <>
            <Table striped bordered hover
                size="sm"
                
                >
                <thead>
                    <tr>
                        <th style={{textAlign: 'center'}}>순번</th>
                        <th style={{textAlign: 'center'}}>제목</th>
                        <th style={{textAlign: 'center'}}>작성자</th>
                        <th style={{textAlign: 'center'}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrBoard ?
                            arrBoard?.map((item, index) => {
                                return (
                                    <tr key={item?.num + '-' + index}>
                                        <td style={{textAlign: 'center'}}>{item?.num}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.writer}</td>
                                        <td>{item?.writeDt}</td>
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

