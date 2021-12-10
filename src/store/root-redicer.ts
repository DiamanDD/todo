import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolists-reducer";
import {appReducer} from "./app-reducer";
import {loginReducer} from "../components/Login/login-reduser";

const rootReducer = combineReducers({
    tasksReducer,
    todoListReducer,
    appReducer,
    loginReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer, applyMiddleware(thunk))
export default store
// @ts-ignore
window.store = store