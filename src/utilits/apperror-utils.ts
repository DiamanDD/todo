import { Dispatch } from "redux";
import { ResponsType } from "../api/todolosts-api";
import {setErrorMessageAC, setErrorMessageType, setStatusMessageAC, setStatusMessageType} from "../store/app-reducer";

export const handleServerAppError=<D>(data: ResponsType<D>, dispatch: Dispatch<setErrorMessageType | setStatusMessageType>)=>{
    if (data.messages){
        dispatch(setErrorMessageAC(data.messages[0]))
    }
    else{
        dispatch(setErrorMessageAC("Some errror"))
    }
}
export const handleNetworkAppError=( error:{message:string}, dispatch: Dispatch<setErrorMessageType | setStatusMessageType>)=>{
    dispatch(setErrorMessageAC(error.message))
    dispatch(setStatusMessageAC("succeeded"))
}