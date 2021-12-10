import {Dispatch} from "redux";
import {FormikErrorType} from "./Login";
import {todoListAPI} from "../../api/todolosts-api";
import {setStatusMessageAC} from "../../store/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utilits/apperror-utils";

const initialState = {
    isAuth: false
}
type initialStateStateType = typeof initialState

type ActionType = ReturnType<typeof setInitializationAC>
export const setInitializationAC = (isAuth: boolean) => {
    return {
        type: "login/SET_INITIALIZATION_STATE",
        isAuth
    } as const
}
export const logOutAC = (isAuth: boolean) => {
    return {
        type: "login/LOG_OUT",
        isAuth
    } as const
}
export const setInitializationTC = (value: FormikErrorType) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC("loading"))
        todoListAPI.autorization(value).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setInitializationAC(true))
                dispatch(setStatusMessageAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setStatusMessageAC("succeeded"))
            }
        }).catch((error) => {
            handleNetworkAppError(error.message, dispatch)
        })
    }
}
export const LogOutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC("loading"))
        todoListAPI.logOut().then((res) => {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(setInitializationAC(false))
                dispatch(setStatusMessageAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setStatusMessageAC("succeeded"))
            }
        }).catch((error) => {
            handleNetworkAppError(error.message, dispatch)
        })
    }
}

export const loginReducer = (state: initialStateStateType = initialState, action: ActionType): initialStateStateType => {
    switch (action.type) {
        case "login/SET_INITIALIZATION_STATE":
            return {...state, isAuth: action.isAuth}
        default:
            return {...state}
    }
}
