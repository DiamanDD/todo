import React from 'react';
import './App.css';
import {taskType, TodoList} from "./TodoList";
import {AccordionTitle} from "./AccordionTitle";
import {AccordionBody} from "./AccordionBody";


function App(){

let tasks1:Array<taskType>  = [
    {id: 1, title: "CSS", isDone: true },
    {id: 2, title: "JS", isDone: true },
    {id: 3, title: "React", isDone: false }
];
    let tasks2:Array<taskType>  = [
        {id: 1, title: "CSS1", isDone: false },
        {id: 2, title: "JS2", isDone: true },
        {id: 3, title: "React3", isDone: false }
    ];
return (
    <div className="App">
        <TodoList titles={"What to learn 1"} title={tasks1}/>
        <TodoList  titles={"What to learn 2"} title={tasks2}/>
        <AccordionTitle/>
        <AccordionBody/>



    </div>
);
}

export default App;
