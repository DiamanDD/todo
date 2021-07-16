import React, {useState} from 'react';
import './App.css';
import {taskType} from "./components/TodoList";
import {TodoList} from "./components/TodoList";
export type filterNasadkaType="All" |"Active"|"Completed"
function App() {
    let [tasks1, setTassc1] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React", isDone: true},
    ])
    type filterNasadkaType="All" |"Active"|"Completed"
    let[nasadka, setNasadka] = useState<filterNasadkaType>("Completed")

    let nasadkaFilter=tasks1
    if(nasadka=="Active"){
        tasks1=tasks1.filter(selectorMessage=>selectorMessage.isDone==false)
    }
    else if(nasadka=="Completed"){
        tasks1=tasks1.filter(selectorMessage=>selectorMessage.isDone==true)
    }
    else{
        tasks1=tasks1

    }



    const removeTasks=(mTascks:number)=>{
        console.log(mTascks)
        tasks1=tasks1.filter(removeTasks=>removeTasks.id!=mTascks)
        setTassc1(tasks1)
    }
   const setFilters=(valueFilters:filterNasadkaType)=>{
        console.log(valueFilters)
        setNasadka(valueFilters)
    }



    return (
        <div className="App">
            <TodoList
                titles={"What to learn 1"}
                setFilters={setFilters}
                tasks={tasks1}
                removeTasks={removeTasks}/>
        </div>
    );


}

export default App;
