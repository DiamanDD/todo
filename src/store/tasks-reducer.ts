import {addTodolistAC, changeTodoListEntytyStatusAC, removeTodolostAC, setTodoListAC,} from "./todolists-reducer";
import {TasksDomainType, TaskStatuses, todoListAPI, TodoTaskPriorites, updateTaskType} from "../api/todolosts-api";
import {Dispatch} from "redux";
import {AppStateType} from "./root-redicer";
import {setStatusMessageAC} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../utilits/apperror-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// const ADD_TASK = "ADD_TASK"
// const REMOVE_TASK = "REMOVE_TASK"
// const UPDATE_TASK = "UPDATE_TASK"
// const CHANGE_TASK = "CHANGE_TASK"
// const SET_TASKS = "SET_TASKS"
// const REMOVE_TODOLIST = "REMOVE_TODOLIST"
//
// type tasksACtype =
//     addTascksAT
//     | removeTascksAT
//     | updateTascksAT
//     | changeStatusTaskAT
//     | AddTodoListType
//     | RemoveTodolistType
//     | setTodoListAT
//     | setTasksAT
//
// type addTascksAT = ReturnType<typeof addTaskAC>
// type removeTascksAT = ReturnType<typeof removeTaskAC>
// type updateTascksAT = ReturnType<typeof updateTaskAC>
// type changeStatusTaskAT = ReturnType<typeof changeStatusTaskAC>
export type TascsStateType = {
    [key: string]: Array<TasksDomainType>
}
type updTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorites
    startDate?: string | null
    deadline?: string | null
}
type setTasksAT = {
    type: "SET_TASKS",
    tasks: Array<TasksDomainType>,
    todolistId: string

}
type ThunkDispanch = Dispatch
const InitialState: TascsStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: {
        setTasksAC(state,action:PayloadAction<{tasks: TasksDomainType[], todolistId: string}>){
            state[action.payload.todolistId] = action.payload.tasks

        },
        addTaskAC(state,action:PayloadAction<{task: TasksDomainType}>){
        state[action.payload.task.todoListId]=[action.payload.task,
                ...state[action.payload.task.todoListId]]
        },
        removeTaskAC(state,action:PayloadAction<{id: string, todolistID: string}>){
            state[action.payload.todolistID]=state[action.payload.todolistID].filter(t => (t.id !== action.payload.id))
        },
        updateTaskAC(state,action:PayloadAction<{id: string, updTaskModel: updTaskModelType, todolistID: string}>){
        state[action.payload.todolistID]=state[action.payload.todolistID].map(t => (t.id === action.payload.id ? {
                ...t,
                ...action.payload.updTaskModel
            } : t))

        },
        changeStatusTaskAC(state,action:PayloadAction<{id: string, status: TaskStatuses, todolistID: string}>){},
        // setTodoListAC(state,action:PayloadAction<{TodoList: Array<TodoListsType>}>){
        //     action.payload.TodoList.forEach((tl) => state[tl.id] = [])
        // },
        // addTodolostAC(state,action:PayloadAction<{todolist: TodoListsType}>){
        //     state[action.payload.todolist.id]= []
        // },
        // removeTodolostAC(state,action:PayloadAction<{todolistId1: string}>){
        //
        //     delete state[action.payload.todolistId1]
        //
        // },
    },
    extraReducers:(builder)=>{
        builder.addCase(setTodoListAC,(state,action)=>{
    action.payload.TodoList.forEach((tl:any)=>{
        state[tl.id]=[]
    })
        })
        builder.addCase(addTodolistAC,(state,action)=>{
            state[action.payload.todolist.id]=[]
        })
        builder.addCase(removeTodolostAC,(state,action)=>{
            delete state[action.payload.todolistId1]
        })
    }
    // extraReducers:{
    //     [setTodoListAC.type]:(state,action:PayloadAction<{}>)=>{},
    //     [addTodolostAC.type]:(state,action:PayloadAction<{}>)=>{},
    //     [removeTodolostAC.type]:(state,action:PayloadAction<{}>)=>{},
    // }
})
export const tasksReducer=slice.reducer

export const {setTasksAC}=slice.actions
export const {addTaskAC}=slice.actions
export const {removeTaskAC}=slice.actions
export const {updateTaskAC}=slice.actions
export const {changeStatusTaskAC}=slice.actions




// export const setTasksAC = (tasks: TasksDomainType[], todolistId: string) => {
//     return {
//         type: SET_TASKS,
//         tasks,
//         todolistId
//     } as const
// }
// export const addTaskAC = (task: TasksDomainType) => {
//     return {
//         type: ADD_TASK,
//         task
//     } as const
// }
// export const removeTaskAC = (id: string, todolistID: string) => {
//     return {
//         type: REMOVE_TASK,
//         id: id,
//         todolistID: todolistID
//     } as const
// }
// export const updateTaskAC = (id: string, updTaskModel: updTaskModelType, todolistID: string) => {
//     return {
//         type: UPDATE_TASK,
//         updTaskModel,
//         id: id,
//         todolistID: todolistID
//     } as const
// }
// export const changeStatusTaskAC = (id: string, status: TaskStatuses, todolistID: string) => {
//     return {
//         type: CHANGE_TASK,
//         status: status,
//         id: id,
//         todolistID: todolistID
//
//     } as const
// }

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: ThunkDispanch) => {
        debugger
        todoListAPI.getTasks(todolistId)
            .then((res) => {
                    dispatch(setTasksAC({tasks:res.data.items, todolistId:todolistId}))
                    dispatch(setStatusMessageAC({status: "idle"}))
                }
            ).catch((error) => {
            handleNetworkAppError(error.message, dispatch)
        })
    }

}
export const addTaskTC = (title: string, todolistID: string) => {
    return (dispatch: ThunkDispanch) => {
        dispatch(setStatusMessageAC({status: "loading"}))
        dispatch(changeTodoListEntytyStatusAC({status: "loading", todolistId2: todolistID}))
        todoListAPI.createTask(todolistID, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task:res.data.data.item}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(setStatusMessageAC({status: "succeeded"}))
                dispatch(changeTodoListEntytyStatusAC({status: "succeeded", todolistId2: todolistID}))

            })
            .catch((error) => {
                handleNetworkAppError(error.message, dispatch)
            })
    }
}
export const selectedfilterTC = (id: string, todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status: "loading"}))
        dispatch(changeTodoListEntytyStatusAC({status: "loading", todolistId2: todolistID}))
        todoListAPI.deleteTask(todolistID, id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({id:id,todolistID:todolistID}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(setStatusMessageAC({status: "succeeded"}))
                dispatch(changeTodoListEntytyStatusAC({status:"succeeded",todolistId2:todolistID} ))
            })
            .catch((error) => {
                handleNetworkAppError(error.message, dispatch)
            })
    }
}
export const updateTaskTC = (id: string, updTaskModel: updTaskModelType, todolistID: string) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const state = getState()
        const oldTAsk = state.tasksReducer[todolistID].find(tl => tl.id === id)
        if (!oldTAsk) {
            return
        }
        const task: updateTaskType = {
            description: oldTAsk.description,
            title: oldTAsk.title,
            status: oldTAsk.status,
            priority: oldTAsk.priority,
            startDate: oldTAsk.startDate,
            deadline: oldTAsk.deadline,
            ...updTaskModel
        }
        todoListAPI.updateTask(todolistID, id, task)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    console.log(todolistID, id, task)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(updateTaskAC({updTaskModel:updTaskModel,id:id,todolistID:todolistID}))

            })
            .catch((error) => {
                handleNetworkAppError(error.message, dispatch)
            })
    }
}

// export const tasksReducer = (state: TascsStateType = InitialState, action: tasksACtype): TascsStateType => {
//     switch (action.type) {
//         // case SET_TASKS: {
//         //     const stateCopy = {...state}
//         //     stateCopy[action.todolistId] = action.tasks
//         //     return stateCopy
//         // }
//         // case SET_TODO_LIST: {
//         //     const stateCopy = {...state}
//         //     action.TodoList.forEach((tl) => stateCopy[tl.id] = [])
//         //     return stateCopy
//         // }
//         // case ADD_TASK: {
//         //     return {
//         //         ...state,
//         //         [action.task.todoListId]: [action.task,
//         //             ...state[action.task.todoListId]]
//         //     }
//         // }
//         // case REMOVE_TASK: {
//         //     return {...state, [action.todolistID]: state[action.todolistID].filter(t => (t.id !== action.id))}
//         // }
//         // case UPDATE_TASK: {
//         //     return {
//         //         ...state,
//         //         [action.todolistID]: state[action.todolistID].map(t => (t.id === action.id ? {
//         //             ...t,
//         //             ...action.updTaskModel
//         //         } : t))
//         //     }
//         // }
//         // case ADD_TODOLIST: {
//         //     return {...state, [action.todolist.id]: []}
//         // }
//         // case REMOVE_TODOLIST:
//         //     const stateCopy = {...state}
//         //     delete stateCopy[action.id]
//         //     return stateCopy
//         default:
//             return state
//     }
// }
