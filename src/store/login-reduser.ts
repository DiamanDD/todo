import {Dispatch} from "redux";
import {FormikErrorType} from "../components/Login/Login";
import {todoListAPI} from "../api/todolosts-api";
import {setStatusMessageAC} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../utilits/apperror-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setInitializationAC(state,action:PayloadAction<{isAuth:boolean}>){
            state.isAuth=action.payload.isAuth
        },
        logOutAC(state,action:PayloadAction<{isAuth: boolean}>){

        }
    },
})
export const loginReducer=slice.reducer
export const {setInitializationAC}=slice.actions

export const setInitializationTC = (value: FormikErrorType) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status:"loading"}))
        todoListAPI.autorization(value).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setInitializationAC({isAuth:true}))
                dispatch(setStatusMessageAC({status:"succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setStatusMessageAC({status:"succeeded"}))
            }
        }).catch((error) => {
            handleNetworkAppError(error.message, dispatch)
        })
    }
}
export const LogOutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status:"loading"}))
        todoListAPI.logOut().then((res) => {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(setInitializationAC({isAuth:false}))
                dispatch(setStatusMessageAC({status:"succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setStatusMessageAC({status:"succeeded"}))
            }
        }).catch((error) => {
            handleNetworkAppError(error.message, dispatch)
        })
    }
}
