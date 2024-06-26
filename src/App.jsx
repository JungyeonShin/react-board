import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "./layout/TopNav";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Loading from "./comm/Loading";
import { createPrjStore } from "./app/store";

const MainContainer = lazy(() => import('./main/MainContainer'));
const BoardContainer = lazy(() => import('./board/BoardContainer'));

// const Loading = lazy(() => import('./comm/Loading'));
    //   console.log("test")
export const store = createPrjStore();

function App() {

    // const queryClient = new QueryClient({
    //     defaultOptions: {
    //       queries: {
    //         refetchOnWindowFocus: false,
    //         refetchOnMount: false,
    //       },
    //     },
    //   })
    return (
        // <QueryClientProvider client={queryClient}>
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
        // </QueryClientProvider>
    )
}

export default App;
