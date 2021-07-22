import React, {useState} from 'react';

import './App.css';

import {propsType, taskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

function App() {

let [tasksFielter,setFilter]=useState( [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React-Native", isDone: true},
    ])
    let [selectedfilter, setselectedFilter]=useState<"All"| "Active"| "Completed">("All")

    if(selectedfilter=="Active"){
        (tasksFielter=tasksFielter.filter(s=>(s.isDone===false)))
    }
    else if(selectedfilter=="Completed"){
        (tasksFielter=tasksFielter.filter(s=>(s.isDone===true)))
    }


 const removeItems=(id:string)=>{
     tasksFielter=tasksFielter.filter(t=>(t.id!==id) )
     setFilter(tasksFielter)
 }

 const selectedParametr=(elem:"All"| "Active"| "Completed")=>{
     setselectedFilter(elem)

    }

    const addTask=(title:string)=>{
        let task:taskType={id:v1(),title:title,isDone:true}
        let newTasks=[task, ...tasksFielter]
        setFilter(newTasks)
    }

    return (
        <div className="App">
            <TodoList
                titles={"What to learn 1"}
                removeItems={removeItems}
                selectedParametr={selectedParametr}
                tasks={tasksFielter}
                newTasks={addTask}
                />
        </div>
    )


}

export default App;
