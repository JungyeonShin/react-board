import { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "./layout/TopNav";
import BoardList from "./main/BoardList";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
// import MainContainer from "./main/MainContainer";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Loading from "./comm/Loading";
// import BoardConatiner from "./board/BoardContainer";
// import Loading from "./comm/Loading";

const MainContainer = lazy(() => import('./main/MainContainer'));
const BoardContainer = lazy(() => import('./board/BoardContainer'));

// const Loading = lazy(() => import('./comm/Loading'));

function App() {
    
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={
                        <Suspense fallback={<Loading/>}>
                            <MainContainer />
                        </Suspense>
                    } 
                />
                <Route path="/board" element={
                        <Suspense fallback={<Loading/>}>
                            <BoardContainer />
                        </Suspense>
                    }
                />
                <Route path="/test" element={<TopNav  />}  />
            </Routes>
        </Provider>
    )
}

export default App;
