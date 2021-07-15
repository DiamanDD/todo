import React from 'react';
import './App.css';
import {taskType} from "./TodoList";
import {Rating} from "./components/Rating";
import {Accordion} from "./components/Accordion";


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
        {/*<TodoList titles={"What to learn 1"} title={tasks1}/>*/}
        {/*<TodoList  titles={"What to learn 2"} title={tasks2}/>*/}

        <Rating value={0}/>
        <Rating value={1}/>
        <Rating value={2}/>
        <Rating value={3}/>
        <Rating value={4}/>
        <Rating value={5}/>
        <Accordion titleValue={"меню"} colapsed={false}/>
        <Accordion titleValue={"Пользователи"} colapsed={true}/>


    </div>
);



}
export default App;
