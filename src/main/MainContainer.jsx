import { useEffect, useMemo, useState } from "react";
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TopNav from "../layout/TopNav";
import BoardList from "./BoardList";
import { setBoardList } from "../reducer/MainSlice";

const MainContainer = ({}) => {

    return (
        <>
        <TopNav />
        
        <div style={{
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Carousel style={{align: "center"}}>
                <Carousel.Item interval={2000}>
                    {/* <ExampleCarouselImage text="First slide" /> */}
                    <Image src="/images/main-react.png" fluid 
                    />
                    <Carousel.Caption>
                        <h3>React로 FrontEnd 제작</h3>
                        <p>Library - Redux, React-Router-Dom</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    {/* <ExampleCarouselImage text="Second slide" /> */}
                    <Image src="/images/main-react-bootstrap.jpeg" fluid />
                    <Carousel.Caption>
                        <h3>디자인 React-Bootstrap 사용</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <ExampleCarouselImage text="Third slide" /> */}
                    <Image src="/images/main-springboot.png" fluid />
                    <Carousel.Caption>
                        <h3 style={{color: "black"}}>BackEnd SpringBoot3</h3>
                        <p style={{color: "black"}}>
                            스프링부트3 적용예정
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
        </>
    );
}

export default MainContainer;