
import {action} from "@storybook/addon-actions";
import {Tasks} from "./Tasks";

export default {
    component: Tasks,
    title: 'TasksBase',


}
const callback=action("click add")
export const TasksBaseExample = () => {

    return (<div>
        <Tasks tasks={{id:"1", title:"one task",isDone:false}}
               todolistId={"1"}
               removeItems={action("call removeItems")}
               setActiveChecked={action("call setActiveChecked")}
               setUpdTask={action("call setUpdTask")}/>
        <Tasks tasks={{id:"1", title:"two task",isDone:true}}
               todolistId={"1"}
               removeItems={action("call removeItems")}
               setActiveChecked={action("call setActiveChecked")}
               setUpdTask={action("call setUpdTask")}/>
    </div>)
}
