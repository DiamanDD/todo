import AppWithREDUX from "./AppWithREDUX";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";

export default {
    component: AppWithREDUX,
    title: 'AppWithREDUX',
    decorators:[ReduxStoreProviderDecorator],


}





export const AppWithReduxBaseExample = () => {

    return <AppWithREDUX/>
}
