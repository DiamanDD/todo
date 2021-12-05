import {AddTodoListType, RemoveTodolistType, SET_TODO_LIST, setTodoListAT, ADD_TODOLIST,} from "./todolists-reducer";
import {TasksDomainType, TaskStatuses, todoListAPI, TodoTaskPriorites, updateTaskType} from "../api/todolosts-api";
import {Dispatch} from "redux";
import {AppStateType} from "./root-redicer";
import {setErrorMessageAC, setStatusMessageAC, setStatusMessageType} from "./app-reducer";

const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"
const UPDATE_TASK = "UPDATE_TASK"
const CHANGE_TASK = "CHANGE_TASK"
const SET_TASKS = "SET_TASKS"

type tasksACtype =
    addTascksAT
    | removeTascksAT
    | updateTascksAT
    | changeStatusTaskAT
    | AddTodoListType
    | RemoveTodolistType
    | setTodoListAT
    | setTasksAT

type addTascksAT = ReturnType<typeof addTaskAC>
type removeTascksAT = ReturnType<typeof removeTaskAC>
type updateTascksAT = ReturnType<typeof updateTaskAC>
type changeStatusTaskAT = ReturnType<typeof changeStatusTaskAC>
export type TascsStateType = {
    [key: string]: Array<TasksDomainType>
}
type updTaskModelType={
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorites
    startDate?: string | null
    deadline?: string |null
}
type setTasksAT = {
    type: "SET_TASKS",
    tasks: Array<TasksDomainType>,
    todolistId: string

}

const InitialState: TascsStateType = {}

export const setTasksAC = (tasks: TasksDomainType[], todolistId: string) => {
    return {
        type: SET_TASKS,
        tasks,
        todolistId
    } as const
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<tasksACtype|setStatusMessageType>) => {

        todoListAPI.getTasks(todolistId).then((res) => {

                dispatch(setTasksAC(res.data.items, todolistId))
            }
        ).finally(()=>{
            dispatch(setStatusMessageAC("idle"))
        })
    }

}

export const addTaskAC = ( task:TasksDomainType) => {
    return {
        type: ADD_TASK,
        task
    } as const
}
export const addTaskTC = (title: string, todolistID: string) => {
    return (dispatch: Dispatch) => {

        dispatch(setStatusMessageAC("loading"))
        todoListAPI.createTask(todolistID, title)
            .then((res) => {

                if(res.data.resultCode==0){
                    dispatch(addTaskAC(res.data.data.item))
                }
                else{
                    if (res.data.messages){
                        dispatch(setErrorMessageAC(res.data.messages[0]))
                    }
                    else{
                        dispatch(setErrorMessageAC("Some errror"))
                    }

                }

        }).finally(()=>{
            dispatch(setStatusMessageAC("succeeded"))
        })
    }
}

export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: REMOVE_TASK,
        id: id,
        todolistID: todolistID
    } as const
}
export const removeTaskThunk = (id: string, todolistID: string) => {
    return (dispatch: Dispatch) => {
        todoListAPI.deleteTask(todolistID, id).then(() => {
            dispatch(removeTaskAC(id, todolistID))
        })
    }
}

export const updateTaskAC = (id: string, updTaskModel:updTaskModelType, todolistID: string) => {
    return {
        type: UPDATE_TASK,
        updTaskModel,
        id: id,
        todolistID: todolistID
    } as const
}
export const changeStatusTaskAC = (id: string, status: TaskStatuses, todolistID: string) => {

    return {
        type: CHANGE_TASK,
        status: status,
        id: id,
        todolistID: todolistID

    } as const
}

export const updateTaskTC=(id: string, updTaskModel: updTaskModelType, todolistID: string)=>{
    return(dispatch:Dispatch,getState:()=>AppStateType)=>{
        const state=getState()
        console.log(state)
        const oldTAsk=state.tasksReducer[todolistID].find(tl=>tl.id===id)
        if(!oldTAsk){
            return console.log(111)
        }
        const task:updateTaskType={
            description: oldTAsk.description,
            title: oldTAsk.title,
            status: oldTAsk.status,
            priority: oldTAsk.priority,
            startDate: oldTAsk.startDate,
            deadline: oldTAsk.deadline,
            ...updTaskModel
        }
        todoListAPI.updateTask(todolistID,id,task).then(()=>{
            console.log(todolistID,id,task)
            dispatch(updateTaskAC(id,updTaskModel,todolistID))

        })
    }
}


export const tasksReducer = (state: TascsStateType = InitialState, action: tasksACtype): TascsStateType => {
    switch (action.type) {
        case SET_TASKS: {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case SET_TODO_LIST: {
            const stateCopy = {...state}
            action.TodoList.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy
        }
        case ADD_TASK: {
            return {
                ...state,
                [action.task.todoListId]: [action.task,
                    ...state[action.task.todoListId]]
            }
        }
        case REMOVE_TASK: {

            return {...state, [action.todolistID]: state[action.todolistID].filter(t => (t.id !== action.id))}
        }
        case UPDATE_TASK: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => (t.id === action.id ? {
                    ...t,
                    ...action.updTaskModel
                } : t))
            }
        }
         case ADD_TODOLIST: {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE_TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]

            return stateCopy


        default:
            return state
    }

}
