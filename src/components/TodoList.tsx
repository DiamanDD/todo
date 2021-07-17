import React, {useState} from "react";


export type taskType = {
    id: number;
    title: string;
    isDone: boolean;
}


type propsType = {
    titles: string;
    tasks: Array<taskType>
    removeItems:(id:number)=>void
    selectedParametr:(value:"All"| "Active"| "Completed")=>void

}
export const TodoList = (props: propsType) => {
    return (
        <div>
            <h3>{props.titles}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                {
                    props.tasks.map((elem)=>{

                        return(

                            <li key={elem.id}><input
                                type="checkbox"
                                checked={elem.isDone}/>
                                <span>{elem.title}</span>
                                <button onClick={()=>props.removeItems(elem.id)} >x</button>
                            </li>

                        )
                    })
                }
       </ul>
            <div>
                <button onClick={()=>props.selectedParametr("All")}>All</button>
                <button onClick={()=>props.selectedParametr("Active")}>Active</button>
                <button onClick={()=>props.selectedParametr("Completed")}>Completed</button>
            </div>
        </div>


    )
}


