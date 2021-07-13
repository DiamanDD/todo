import React from "react";


export type taskType={
    id:number;
    title:string;
    isDone:boolean;
}


type propsType={
 titles?:string;
 title:Array<taskType>
}


 export const TodoList = (props:propsType)=>{
    return(

        <div>
            <h3>{props.titles}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.title[0].isDone}/> <span>{props.title[0].title}</span></li>
                <li><input type="checkbox" checked={props.title[1].isDone}/> <span>{props.title[1].title}</span></li>
                <li><input type="checkbox" checked={props.title[2].isDone}/> <span>{props.title[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>

    )
}

