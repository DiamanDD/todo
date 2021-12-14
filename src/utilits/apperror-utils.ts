import { Dispatch } from "redux";
import { ResponsType } from "../api/todolosts-api";
import {setErrorMessageAC, setStatusMessageAC, } from "../store/app-reducer";

export const handleServerAppError=<D>(data: ResponsType<D>, dispatch: Dispatch)=>{
    if (data.messages){
        dispatch(setErrorMessageAC({error:data.messages[0]}))
    }
    else{
        dispatch(setErrorMessageAC({error:"Some errror"}))
    }
}
export const handleNetworkAppError=( error:{message:string}, dispatch: Dispatch)=>{
    dispatch(setErrorMessageAC({error:error.message}))
    dispatch(setStatusMessageAC({status:"succeeded"}))
}