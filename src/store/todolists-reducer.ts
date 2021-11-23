import {selectedfilterType} from "../AppWithREDUX";
import {todoListAPI, TodoListsType} from "../api/todolosts-api";
import {Dispatch} from "redux";

export const SET_TODO_LIST = "SET_TODO_LIST"
export const REMOVE_TODOLIST="REMOVE_TODOLIST"
export const ADD_TODOLIST="ADD_TODOLIST"
export const CHANGE_TODOLIST_TITLE="CHANGE_TODOLIST_TITLE"
export const CHANGE_TODOLIST_FILTER="CHANGE_TODOLIST_FILTER"

export type TodoListDomainType = TodoListsType & {
    filter: selectedfilterType
}
export type RemoveTodolistType = {
    type: "REMOVE_TODOLIST"
    id: string
}
export type AddTodoListType = ReturnType<typeof addTodolostAC>
export type setTodoListAT = {
    type:"SET_TODO_LIST",
    TodoList:Array<TodoListsType>
}
type ChangeTodoListType = {
    type: "CHANGE_TODOLIST_TITLE"
    id: string
    title: string
}
export type changeTodoListFilterType = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: selectedfilterType
}
type ActionType = RemoveTodolistType | AddTodoListType | ChangeTodoListType | changeTodoListFilterType | setTodoListAT

const InitialState: Array<TodoListDomainType> = []

export const setTodoListAC = (TodoList: Array<TodoListsType>):setTodoListAT => {
    return {
        type: SET_TODO_LIST,
        TodoList
    } as const
}
export const fetchTodolistThunk = () => {
    return (dispatch: Dispatch) => {
        todoListAPI.getTodoLists()
            .then((data) => {
                dispatch(setTodoListAC(data.data))
            })
    }


}

export const addTodolostAC = (todolist:TodoListsType) => {
    return {type: "ADD_TODOLIST", todolist} as const
}
export const addTodoListTC=(newTitle:string)=>{
    return(dispatch:Dispatch)=>{
        todoListAPI.createTodolist(newTitle).then((res)=>{
            console.log(res)
            const todolist=res.data.data.item
            console.log(todolist)
            dispatch(addTodolostAC(todolist))
        })
    }
}

export const removeTodolostAC = (todolistId1: string): RemoveTodolistType => {
    return {type: "REMOVE_TODOLIST", id: todolistId1}
}
export const removeTodoListTC=(todolistId1:string)=>{
    return(dispatch:Dispatch)=>{
       todoListAPI.deleteTodoList(todolistId1).then(()=>{
           dispatch(removeTodolostAC(todolistId1))
       })
    }
}


export const changeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string): ChangeTodoListType => {
    return ({
        type: "CHANGE_TODOLIST_TITLE",
        id: todolistId2,
        title: newTodolistTitle
    })
}
export const changeTodolistTC=(todolistId2: string, newTodolistTitle: string)=>{
    return (dispatch:Dispatch)=>{
       todoListAPI.updateTodoList(todolistId2,newTodolistTitle).then(()=>{
            dispatch(changeTodoListTitleAC(todolistId2,newTodolistTitle))
        })
    }
}

export const changeTodolistFilterAC = (todolistId2: string, newFilter: selectedfilterType): changeTodoListFilterType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        id: todolistId2,
        filter: newFilter
    }
}



export const todoListReducer = (state: Array<TodoListDomainType> = InitialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case SET_TODO_LIST: {
            return action.TodoList.map((tl) => ({...tl, filter: "All"}))
        }
        case REMOVE_TODOLIST: {
            let stateCopy = [...state]
            return stateCopy.filter(dtl => dtl.id !== action.id)
        }
        case ADD_TODOLIST:
            const newtodolist:TodoListDomainType= {...action.todolist,filter:"All"}
            return [newtodolist,...state ]
        case CHANGE_TODOLIST_TITLE: {
            let stateCopy = [...state]
            return stateCopy.map(t => (t.id === action.id ? {...t, title: action.title} : t))
        }
        case CHANGE_TODOLIST_FILTER: {
            let stateCopy = [...state]
            let tlist = stateCopy.find(tl => tl.id === action.id)
            if (tlist) {
                tlist.filter = action.filter
                return [...stateCopy]
            } else return stateCopy
        }
        default:
            return state
    }
}
