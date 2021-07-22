import React, {ChangeEvent,KeyboardEvent, useState} from "react";



export type taskType = {
    id: string;
    title: string;
    isDone: boolean;
}


export type propsType = {
    titles: string;
    tasks: Array<taskType>
    removeItems:(id:string)=>void
    selectedParametr:(value:"All"| "Active"| "Completed")=>void
    newTasks:(title:string)=>void

}


export const TodoList = (props: propsType) => {
    const addTask=()=> {
        props.newTasks(title)
        setTitel("")
    }
    let [title, setTitel]=useState("")
    const onChangeHandler=(t:ChangeEvent<HTMLInputElement>)=>{
        setTitel(t.currentTarget.value)
    }

    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{if (e.charCode===13){ addTask()}

    }

    return (
        <div>
            <h3>{props.titles}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
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


