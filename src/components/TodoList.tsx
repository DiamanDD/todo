import React, {useState} from "react";
import {filterNasadkaType} from "../App";

export type taskType = {
    id: number;
    title: string;
    isDone: boolean;
}


type propsType = {
    titles: string;
    tasks: Array<taskType>
    removeTasks:(mTascks:number)=>void
    setFilters:(valueFilters:filterNasadkaType)=>void

}


export const TodoList = (props: propsType) => {


   //  let[nasadka, setNasadka] = useState<filterNasadkaType>({})
   //
   //  let nasadkaFilter=props.tasks
   //
   //  if(nasadka==="Active"){
   //      nasadkaFilter=props.tasks.filter(selectorMessage=>selectorMessage.isDone==false)
   //  }
   // if(nasadka==="Completed"){
   //     nasadkaFilter=props.tasks.filter(selectorMessage=>selectorMessage.isDone==true)
   //  }



    return (

        <div>
            <h3>{props.titles}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {
                    props.tasks.map((mTask)=>{

                        return(
                            <li key={mTask.id}><input type="checkbox" checked={mTask.isDone}/><span>{mTask.title}</span>
                                <button onClick={()=>props.removeTasks(mTask.id)}>x</button></li>
                        )

                    })
                }



            </ul>
            <div>
                <button onClick={()=>props.setFilters("All")}>All</button>
                <button onClick={()=>props.setFilters("Active")}>Active</button>
                <button onClick={()=>props.setFilters("Completed")}>Completed</button>
            </div>
        </div>


    )
}


