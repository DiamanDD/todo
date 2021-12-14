import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolists-reducer";


import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";
import { loginReducer } from "./login-reduser";

const rootReducer = combineReducers({
    tasksReducer,
    todoListReducer,
    appReducer,
    loginReducer
})
export type AppStateType = ReturnType<typeof rootReducer>

// let store = createStore(rootReducer, applyMiddleware(thunk))
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export default store
// // @ts-ignore
// window.store = store