import { Spinner } from 'react-bootstrap';

const Loading = ({}) => {

    return (
        <>
            {/* <Background> */}
            <div style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                background: "#ffffffb7",
                zIndex: "999",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    fontSize: "1rem",
                    textAlign: "center",
                }}>
                    잠시만 기다려주세요.
                </div>

                <div>
                    <Spinner animation="grow" variant='primary' />
                    {" "}
                    <Spinner animation="grow" variant='primary' />
                    {" "}
                    <Spinner animation="grow" variant='primary' />
                </div>
                
            </div>
        </>
    );
};

export default Loading;