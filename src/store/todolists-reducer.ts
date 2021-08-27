import {selectedfilterType, todoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistType={
    type:"REMOVE-TODOLIST"
    id:string

}
export type AddTodoListType=ReturnType<typeof addTodolostAC>
type ChangeTodoListType={
    type:"CHANGE-TODOLIST-TITLE"
    id:string
    title:string
}
export type changeTodoListFilterType={
    type:"CHANGE-TODOLIST-FILTER"
    id:string
    filter:selectedfilterType
}
type ActionType=RemoveTodolistType   |AddTodoListType|ChangeTodoListType|changeTodoListFilterType

 export const removeTodolostAC=(todolistId1:string):RemoveTodolistType=>{
    return { type: 'REMOVE-TODOLIST', id: todolistId1}
 }
export const addTodolostAC=(newTodolistTitle:string)=>{
    return { type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId:v1()} as const
}
export const changeTodoListTitleAC=(todolistId2:string, newTodolistTitle:string):ChangeTodoListType=>{
    return ({type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    })
}
export const changeTodolistFilterAC=(todolistId2:string, newFilter:selectedfilterType):changeTodoListFilterType=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }
}



export const todoListReducer = (state: Array<todoListType>, action: ActionType): Array<todoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(dtl => dtl.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: "All"}]
        case "CHANGE-TODOLIST-TITLE":

            return state.map(t => (t.id === action.id ? {...t, title: action.title} : t))
        case 'CHANGE-TODOLIST-FILTER':

                let tlist = state.find(tl => tl.id === action.id)
                if (tlist) {
                    tlist.filter =action.filter
                    return [...state]
                }
                else return state
        default:
            throw new Error("I dont Undestend")
    }

}
