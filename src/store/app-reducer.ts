import {Dispatch} from "redux";
import {todoListAPI} from "../api/todolosts-api";
import { setInitializationAC } from "./login-reduser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStartstate = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: initialStartstate = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setErrorMessageAC(state,action:PayloadAction<{error: null | string}>){
        state.error=action.payload.error
        },
        setStatusMessageAC(state,action:PayloadAction<{status: RequestStatusType}>){
            state.status=action.payload.status
        },
        setInitializedAC(state,action){
            state.isInitialized=true
        }

    }
})


export const appReducer=slice.reducer
export const {setErrorMessageAC}=slice.actions
export const {setStatusMessageAC}=slice.actions
export const {setInitializedAC}=slice.actions


export const authMeTC = () => (dispatch: Dispatch) => {
    todoListAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setInitializationAC({isAuth:true}))
            }
        }).finally(() => {
            dispatch(setInitializedAC({}))
        }
    )
}


