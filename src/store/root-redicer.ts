import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolists-reducer";

const rootReducer=combineReducers({
    tasksReducer,
    todoListReducer
})

export type AppStateType=ReturnType<typeof rootReducer>

let store=createStore(rootReducer)
export default store