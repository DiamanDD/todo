import {selectedfilterType} from "../components/App/AppWithREDUX";
import {todoListAPI, TodoListsType} from "../api/todolosts-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusMessageAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export const SET_TODO_LIST = "SET_TODO_LIST"
export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"
export const CHANGE_ENTYTY_STATUS = "CHANGE_ENTYTY_STATUS"
export type TodoListDomainType = TodoListsType & {
    filter: selectedfilterType
    entytyStatus: RequestStatusType
}
// export type RemoveTodolistType = {
//     type: "REMOVE_TODOLIST"
//     id: string
// }
// export type AddTodoListType = ReturnType<typeof addTodolostAC>
// export type setTodoListAT = {
//     type: "SET_TODO_LIST",
//     TodoList: Array<TodoListsType>
// }
// type ChangeTodoListType = {
//     type: "CHANGE_TODOLIST_TITLE"
//     id: string
//     title: string
// }
// export type changeTodoListEntytyStatusType = {
//     type: "CHANGE_ENTYTY_STATUS"
//     id: string
//     status: RequestStatusType
// }
// export type changeTodoListFilterType = {
//     type: "CHANGE_TODOLIST_FILTER"
//     id: string
//     filter: selectedfilterType
// }
// type ActionType =
//     RemoveTodolistType
//     | AddTodoListType
//     | ChangeTodoListType
//     | changeTodoListFilterType
//     | setTodoListAT
//     | changeTodoListEntytyStatusType

const InitialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: InitialState,
    reducers: {
        setTodoListAC(state,action:PayloadAction<{TodoList: Array<TodoListsType>}>){

           return action.payload.TodoList.map((tl) => ({...tl, filter: "All", entytyStatus: "idle"}))


        },
        addTodolistAC(state,action:PayloadAction<{todolist: TodoListsType}>){
            // state.filter(dtl => dtl.id !== action.payload.todolist.id)
            state.unshift({...action.payload.todolist,filter:"All",entytyStatus:"idle"})
        },
        removeTodolostAC(state,action:PayloadAction<{todolistId1: string}>){
            // state.filter(dtl => dtl.id !== action.payload.todolistId1)
            const index =state.findIndex(tl=>tl.id===action.payload.todolistId1)
            if (index>-1){
                state.splice(index,1)
            }
        },
        changeTodoListTitleAC(state,action:PayloadAction<{todolistId2: string, newTodolistTitle: string}>){
            // state.map(t => (t.id === action.payload.todolistId2 ? {...t, title: action.payload.newTodolistTitle} : t))
            const index =state.findIndex(tl=>tl.id===action.payload.todolistId2);
            state[index].title=action.payload.newTodolistTitle
        },
        changeTodolistFilterAC(state,action:PayloadAction<{todolistId2: string, newFilter: selectedfilterType}>){
            const index =state.findIndex(tl=>tl.id===action.payload.todolistId2)
            // state.map(t => (t.id === action.payload.todolistId2 ? {...t, entytyStatus: action.payload.newFilter} : t))
            state[index].filter=action.payload.newFilter
        },
        changeTodoListEntytyStatusAC(state,action:PayloadAction<{todolistId2: string, status: RequestStatusType}>){
            const index =state.findIndex(tl=>tl.id===action.payload.todolistId2)
            state[index].entytyStatus=action.payload.status
            // state.map(t => (t.id === action.payload.todolistId2 ? {...t, entytyStatus: action.payload.status} : t))
        }

    },
})

export const todoListReducer=slice.reducer
export const {setTodoListAC}=slice.actions
export const {addTodolistAC}=slice.actions
export const {removeTodolostAC}=slice.actions
export const {changeTodolistFilterAC}=slice.actions
export const {changeTodoListTitleAC}=slice.actions
export const {changeTodoListEntytyStatusAC}=slice.actions

// export const setTodoListAC = (TodoList: Array<TodoListsType>): setTodoListAT => {
//     return {
//         type: SET_TODO_LIST,
//         TodoList
//     } as const
// }
// export const addTodolostAC = (todolist: TodoListsType) => {
//     return {type: "ADD_TODOLIST", todolist} as const
// }
// export const removeTodolostAC = (todolistId1: string): RemoveTodolistType => {
//     return {type: "REMOVE_TODOLIST", id: todolistId1}
// }
// export const changeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string): ChangeTodoListType => {
//     return ({
//         type: "CHANGE_TODOLIST_TITLE",
//         id: todolistId2,
//         title: newTodolistTitle
//     })
// }
// export const changeTodolistFilterAC = (todolistId2: string, newFilter: selectedfilterType): changeTodoListFilterType => {
//     return {
//         type: "CHANGE_TODOLIST_FILTER",
//         id: todolistId2,
//         filter: newFilter
//     }
// }
// export const changeTodoListEntytyStatusAC = (todolistId2: string, status: RequestStatusType): changeTodoListEntytyStatusType => {
//     return ({
//         type: "CHANGE_ENTYTY_STATUS",
//         id: todolistId2,
//         status
//     }) as const
// }
//



export const fetchTodolistThunk = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status:"loading"}))
        todoListAPI.getTodoLists()
            .then((data) => {

                dispatch(setTodoListAC({TodoList:data.data}))
            })
    }
}
export const addTodoListTC = (newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status:"loading"}))
        todoListAPI.createTodolist(newTitle).then((res) => {
            const todolist = res.data.data.item
            dispatch(addTodolistAC({todolist:todolist}))
            dispatch(setStatusMessageAC({status:"succeeded"}))
        })
    }
}
export const removeTodoListTC = (todolistId1: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status:"loading"}))
        todoListAPI.deleteTodoList(todolistId1).then(() => {
            dispatch(removeTodolostAC({todolistId1:todolistId1}))
            dispatch(setStatusMessageAC({status:"succeeded"}))
        })
    }
}
export const changeTodolistTC = (todolistId2: string, newTodolistTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusMessageAC({status:"loading"}))
        todoListAPI.updateTodoList(todolistId2, newTodolistTitle).then(() => {
            dispatch(changeTodoListTitleAC({todolistId2:todolistId2,newTodolistTitle:todolistId2}))
            dispatch(setStatusMessageAC({status:"succeeded"}))
        })
    }
}

//
// export const todoListReducer = (state: Array<TodoListDomainType> = InitialState, action: ActionType): Array<TodoListDomainType> => {
//     switch (action.type) {
//         // case SET_TODO_LIST: {
//         //     return action.TodoList.map((tl) => ({...tl, filter: "All", entytyStatus: "idle"}))
//         // }
//         // case REMOVE_TODOLIST: {
//         //     return [...state.filter(dtl => dtl.id !== action.id)]
//         // }
//         // case ADD_TODOLIST:
//         //     const newtodolist: TodoListDomainType = {...action.todolist, filter: "All", entytyStatus: "idle"}
//         //     return [newtodolist, ...state]
//         // case CHANGE_TODOLIST_TITLE: {
//         //     return [...state.map(t => (t.id === action.id ? {...t, title: action.title} : t))]
//         // }
//         case CHANGE_ENTYTY_STATUS: {
//
//             return [...state.map(t => (t.id === action.id ? {...t, entytyStatus: action.status} : t))]
//         }
//         case CHANGE_TODOLIST_FILTER: {
//             return [...state.map(t => (t.id === action.id ? {...t, filter: action.filter} : t))]
//         }
//         default:
//             return state
//     }
// }
