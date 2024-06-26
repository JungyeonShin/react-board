import { useRef } from "react";
import { useState } from "react";
import clientAxios from "./clientAxios"
import { objChnage } from "./common";

export const postFetch = (url, paramObj) => {

    // const [returnData, setReturnData] = useState({
    //     data: null,
    //     isLoading: true,
    //     isError: false,
    //     resultCode: 200,
    // });


    const returnData = {
        data: null,
        isLoading: true,
        isError: false,
        resultCode: 200,
    };

    const fetchData = clientAxios.post(url, paramObj)
        .then(res => {
            returnData["data"] = res.data;
        })
        .catch(err => {
            returnData["isError"] = true;
        })
        .finally(() =>{
            returnData["isLoading"] = false;
        });

    // console.log("데이타 : ", fetchData.data);
    return returnData;
    /*
    clientAxios.post(url, paramObj)
        .then(res => {
            // objChnage(res?.data, "data", setReturnData);
        }).catch(err => {
            // objChnage(null, "data", setReturnData);
            // objChnage(true, "isError", setReturnData);
        }).finally(() => {
            // objChnage(false, "isLoading", setReturnData);
        });
    */
    
    // return await fetchData.data;
}