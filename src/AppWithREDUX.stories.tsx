import AppWithREDUX from "./AppWithREDUX";
import {Provider} from "react-redux";
import store from "./store/root-redicer";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {combineReducers} from "redux";
import {tasksReducer} from "./store/tasks-reducer";
import {todoListReducer} from "./store/todolists-reducer";

export default {
    component: AppWithREDUX,
    title: 'AppWithREDUX',
    decorators:[ReduxStoreProviderDecorator],


}





export const AppWithReduxBaseExample = () => {

    return <AppWithREDUX/>
}
