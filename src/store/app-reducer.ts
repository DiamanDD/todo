import {Dispatch} from "redux";
import {todoListAPI} from "../api/todolosts-api";
import {setInitializationAC} from "../components/Login/login-reduser";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStartstate = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
type InitialStateType = typeof initialState
export type  setErrorMessageType = ReturnType<typeof setErrorMessageAC>
export type  setStatusMessageType = ReturnType<typeof setStatusMessageAC>
export type setInitializedType = ReturnType<typeof setInitializedAC>
type AppActionType = setErrorMessageType | setStatusMessageType | setInitializedType

const initialState: initialStartstate = {
    status: 'idle',
    error: null,
    isInitialized: false
}


export const setErrorMessageAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setStatusMessageAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setInitializedAC = () => {
    return {
        type: 'APP/SET-INITIALIZED',
    } as const
}
export const authMeTC = () => (dispatch: Dispatch) => {
    todoListAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setInitializationAC(true))
            }
        }).finally(() => {
            dispatch(setInitializedAC())
        }
    )
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':

            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: true}
        default:
            return state
    }
}



