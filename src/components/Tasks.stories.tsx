import {action} from "@storybook/addon-actions";
import {Tasks} from "./Tasks";
import {TaskStatuses} from "../api/todolosts-api";

export default {
    component: Tasks,
    title: 'TasksBase',


}
const callback=action("click add")
export const TasksBaseExample = () => {

    return (<div>
        <Tasks tasks={{id:"1", title:"one task",status:TaskStatuses.New,todoListId:"1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}}
               todolistId={"1"}
               removeItems={action("call removeItems")}
               setActiveChecked={action("call setActiveChecked")}
               setUpdTask={action("call setUpdTask")}/>
        <Tasks tasks={{id:"1", title:"two task",status:TaskStatuses.New,todoListId:"1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}}
               todolistId={"1"}
               removeItems={action("call removeItems")}
               setActiveChecked={action("call setActiveChecked")}
               setUpdTask={action("call setUpdTask")}/>
    </div>)
}
