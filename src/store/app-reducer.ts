export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStartstate={
    status: RequestStatusType
    error: string | null
}
 const initialState: initialStartstate = {
    status: 'idle',
    error:null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':

            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}
export const setErrorMessageAC=(error:null |string)=>{
    return{
        type:'APP/SET-ERROR',
        error
    } as const
}
export const setStatusMessageAC=(status:RequestStatusType)=>{
    return{
        type:'APP/SET-STATUS',
        status
    } as const
}


export type  setErrorMessageType=ReturnType<typeof setErrorMessageAC>
export type  setStatusMessageType=ReturnType<typeof setStatusMessageAC>

type AppActionType=setErrorMessageType | setStatusMessageType
