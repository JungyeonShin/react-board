import client from "../api/client";



export const getMemberList = () => {
    return client.get("/api/test");
}
