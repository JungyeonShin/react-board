import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "./layout/TopNav";
import BoardList from "./main/BoardList";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import MainContainer from "./main/MainContainer";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import BoardConatiner from "./board/BoardContainer";

function App() {
    
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<BoardConatiner/>} />
                <Route path="/test" element={<TopNav  />}  />
            </Routes>
        </Provider>
    )
}

export default App;
