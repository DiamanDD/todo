import {TascsStateType} from "../App";
import {v1} from "uuid";
import {taskType} from "../components/TodoList";
import {AddTodoListType, RemoveTodolistType} from "./todolists-reducer";

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
export const changeStatusTaskAC = (id: string, isDone: boolean, todolistID: string) => {
    return {
        type: CHANGE_TASK,
        isDone: isDone,
        id: id,
        todolistID: todolistID

    } as const
}


export const tasksReducer = (state: TascsStateType, action: tasksACtype): TascsStateType => {
    switch (action.type) {

        case ADD_TASK: {
            const stateCopy = {...state}
            let task: taskType = {id: v1(), title: action.title, isDone: false}
            let todolisttask = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = [task, ...todolisttask]
            return {...stateCopy}
        }
        case REMOVE_TASK: {
            const stateCopy = {...state}
            let todlistTasck = state[action.todolistID]

            stateCopy[action.todolistID] = todlistTasck.filter(t => (t.id !== action.id))
            return {...stateCopy}
        }
        case UPDATE_TASK: {
            const stateCopy = {...state}
            let newlistTasck = state[action.todolistID]

            stateCopy[action.todolistID] = newlistTasck.map(t => (t.id === action.id ? {
                ...t,
                title: action.newTitle
            } : t))

            return {...stateCopy}
        }
        case CHANGE_TASK: {
            const stateCopy = {...state}
            let newlistTasck = state[action.todolistID]

            stateCopy[action.todolistID] = newlistTasck.map(t => (t.id === action.id ? {
                ...t,
                isDone: action.isDone
            } : t))


            return {...stateCopy}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        default:
            throw new Error("I dont Undestend")
    }

}
