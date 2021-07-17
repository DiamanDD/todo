import React, {useState} from 'react';
import './App.css';

import {taskType, TodoList} from "./components/TodoList";

function App() {

let [tasksFielter,setFilter]=useState( [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React-Native", isDone: true},
    ])
    let [selectedfilter, setselectedFilter]=useState<"All"| "Active"| "Completed">("All")

    if(selectedfilter=="Active"){
        (tasksFielter=tasksFielter.filter(s=>(s.isDone===false)))
    }
    else if(selectedfilter=="Completed"){
        (tasksFielter=tasksFielter.filter(s=>(s.isDone===true)))
    }


 const removeItems=(id:number)=>{
     tasksFielter=tasksFielter.filter(t=>(t.id!==id) )
     setFilter(tasksFielter)
 }

 const selectedParametr=(elem:"All"| "Active"| "Completed")=>{
     setselectedFilter(elem)

    }


    return (
        <div className="App">
            <TodoList
                titles={"What to learn 1"}
                removeItems={removeItems}
                selectedParametr={selectedParametr}
                tasks={tasksFielter}
                />
        </div>
    )


}

export default App;
