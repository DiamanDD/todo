import React, {useState} from "react";

import "./App.css";

import {taskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

type todoListType = {
    id: string
    title: string
    filter: selectedfilterType

}

type TascsStateType={
    [key:string]:Array<taskType>
}
export type selectedfilterType = "All" | "Active" | "Completed"

function App() {


    let todoList1 = v1()
    let todolist2 = v1()

    let [tasks, setTascks] = useState<TascsStateType>({
        [todoList1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React-Native", isDone: true}
        ],
        [todolist2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "petr", isDone: false},

        ]
    })
    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        // const updateTasck=tasks.map(t=>{
        //     if (t.id===id){
        //         let copyTasc={...t}
        //         copyTasc.isDone=isDone
        //
        //         return copyTasc
        //     }
        //
        //         return t
        //
        //
        // })
        let newlistTasck = tasks[todoListId]
        let newtask = newlistTasck.map(t => (t.id === id ? {...t, isDone: isDone} : t))
        tasks[todoListId] = newtask
        setTascks({...tasks})
        debugger

    }

    const removeTask = (id: string, todoListId: string) => {
        let todlistTasck = tasks[todoListId]

        tasks[todoListId] = todlistTasck.filter(t => (t.id !== id))
        setTascks({...tasks})
        debugger
    }
    const filterChangeStatus = (elem: selectedfilterType, todoLostId: string) => {

        let tlist = todoList.find(tl => tl.id === todoLostId)

        if (tlist) {
            tlist.filter = elem
            setTodolist([...todoList])

        }

    }

    const addTask = (title: string, todoListId: string) => {

        let task: taskType = {id: v1(), title: title, isDone: true}
        let todolisttask = tasks[todoListId]
        tasks[todoListId] = [task, ...todolisttask]

        setTascks({...tasks})
    }
    let [todoList, setTodolist] = useState<Array<todoListType>>(
        [
            {id: todoList1, title: "list1", filter: "All"},
            {id: todolist2, title: "list2", filter: "All"}
        ])
    const filterDeletTodolist = (todolistid: string) => {
        let dletedTodolist = todoList.filter(dtl => dtl.id !== todolistid)
        console.log(dletedTodolist)
        setTodolist(dletedTodolist)
        delete tasks[todolistid]
        setTascks({...tasks})
        console.log(tasks)
    }

    return (
        <div className="App">
            {todoList.map(tl => {
                let allTodolist = tasks[tl.id]
                let taskForTodoList = allTodolist
                if (tl.filter === "Active") (taskForTodoList = taskForTodoList.filter(s => (s.isDone === false)))
                else if (tl.filter === "Completed") (taskForTodoList = taskForTodoList.filter(s => (s.isDone === true)))

                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    titles={tl.title}
                    removeItems={removeTask}
                    tasks={taskForTodoList}
                    newTasks={addTask}
                    selectedfilter={tl.filter}
                    setActiveChecked={changeStatus}
                    deleteTodolist={filterDeletTodolist}
                    selectedParametr={filterChangeStatus}
                />
            })}

        </div>
    )


}

export default App;
