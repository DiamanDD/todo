
import {v1} from "uuid";
import {AddTodoListType, RemoveTodolistType, todoList1, todolist2} from "./todolists-reducer";
import {TaskStatuses, TasksType} from "../api/todolosts-api";



const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"
const UPDATE_TASK = "UPDATE_TASK"
const CHANGE_TASK = "CHANGE_TASK"


type tasksACtype =
    addTascksAT
    | removeTascksAT
    | updateTascksAT
    | changeStatusTaskAT
    | AddTodoListType
    | RemoveTodolistType

type addTascksAT = ReturnType<typeof addTaskAC>
type removeTascksAT = ReturnType<typeof removeTaskAC>
type updateTascksAT = ReturnType<typeof updateTaskAC>
type changeStatusTaskAT = ReturnType<typeof changeStatusTaskAC>

export type TascsStateType = {
    [key: string]: Array<TasksType>
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: ADD_TASK,
        title: title,
        todolistID: todolistID

    } as const
}
export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: REMOVE_TASK,
        id: id,
        todolistID: todolistID

    } as const
}
export const updateTaskAC = (id: string, newTitle: string, todolistID: string) => {
    return {
        type: UPDATE_TASK,
        newTitle: newTitle,
        id: id,
        todolistID: todolistID

    } as const
}
export const changeStatusTaskAC = (id: string, status:TaskStatuses, todolistID: string) => {

    return {
        type: CHANGE_TASK,
        status: status,
        id: id,
        todolistID: todolistID

    } as const
}
const InitialState: TascsStateType = {

    [todoList1]: [
        {id: v1(), title: "CSS", status:TaskStatuses.Competed,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todoList1},
        {id: v1(), title: "JS", status:TaskStatuses.Competed,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todoList1},
        {id: v1(), title: "React",status:TaskStatuses.New,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todoList1},
        {id: v1(), title: "React-Native", status:TaskStatuses.Competed,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todoList1}
    ],
    [todolist2]: [
        {id: v1(), title: "milk", status:TaskStatuses.Competed,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todolist2},
        {id: v1(), title: "bread",status:TaskStatuses.Competed,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todolist2},
        {id: v1(), title: "petr",status:TaskStatuses.New,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:todolist2},

    ]
}

export const tasksReducer = (state: TascsStateType = InitialState, action: tasksACtype): TascsStateType => {
    switch (action.type) {

        case ADD_TASK: {
                      return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title,  status:TaskStatuses.New,addedDate:"",deadline:"",description:"desript",order:0,priority:0,startDate:"",todoListId:action.todolistID},
                    ...state[action.todolistID]]
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
                    title: action.newTitle
                } : t))
            }
        }
        case CHANGE_TASK: {
            console.log(action.status)
            const stateCopy = {...state}
            let newlistTasck = state[action.todolistID]

            stateCopy[action.todolistID] = newlistTasck.map(t => (t.id === action.id ? {
                ...t,
                status: action.status
            } : t))


            return {...stateCopy}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]

            return stateCopy


        default:
            return state
    }

}
