import {Provider} from "react-redux";
import store, {AppStateType} from "./store/root-redicer";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./store/tasks-reducer";
import {todoList1, todolist2, todoListReducer} from "./store/todolists-reducer";
import {v1} from "uuid";
import {TascsStateType, todoListType} from "./AppWithREDUX";

const rootReducer = combineReducers({
   todoListReducer,
    tasksReducer,
})
type InitialStateGlobalStoryestype={

    todolist:Array<todoListType>,
    tasks:TascsStateType,
}

const InitialStateGlobalStoryes = {
    tasks: {
        ["todoList1"]:
            [
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "React-Native", isDone: true}
            ],
        ["todolist2"]:
            [
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "petr", isDone: false},
            ]
    },
    todolist:
        [
            {id: "todoList1", title: "list1", filter: "All"},
            {id: "todolist2", title: "list2", filter: "All"}
        ]
    ,
}


const globalStore = createStore(rootReducer, InitialStateGlobalStoryes as unknown as AppStateType )

export const ReduxStoreProviderDecorator = (storyFn: any) => {

    return (
        <Provider store={globalStore}>{storyFn()}</Provider>
    )
}