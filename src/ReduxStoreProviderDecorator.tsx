import {Provider} from "react-redux";
import {AppStateType} from "./store/root-redicer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./store/tasks-reducer";
import {todoListReducer} from "./store/todolists-reducer";
import {appReducer} from "./store/app-reducer";
import thunk from "redux-thunk";
import {TaskStatuses} from "./api/todolosts-api";


const rootReducer = combineReducers({
   todoListReducer,
    tasksReducer,
    appReducer
})




const InitialStateGlobalStoryes = {
    tasks: {
        ["todoList1"]:
            [
                { id: "1", title: "CSS", status:TaskStatuses.New,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
                { id: "2", title: "JS", status:TaskStatuses.Competed,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
                { id: "3", title: "React", status:TaskStatuses.New,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 }
            ],
        ["todolist2"]:
            [
                { id: "1", title: "CSS", status:TaskStatuses.New,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
                { id: "2", title: "JS", status:TaskStatuses.Competed,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
                { id: "3", title: "React", status:TaskStatuses.New,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 }
            ]
    },
    todolist:
        [
            { id: "1", title: "CSS", status:TaskStatuses.New,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
            { id: "2", title: "JS", status:TaskStatuses.Competed,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
            { id: "3", title: "React", status:TaskStatuses.New,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 }
        ]
    ,
    app:{
        status: 'idle',
        error:null
    }
}




const storyBoolStore = createStore(rootReducer, InitialStateGlobalStoryes as unknown as AppStateType,applyMiddleware(thunk) )

export const ReduxStoreProviderDecorator = (storyFn: any) => {

    return (
        <Provider store={storyBoolStore}>{storyFn()}</Provider>
    )
}