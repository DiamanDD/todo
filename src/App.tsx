import React, {useState} from "react";

import "./App.css";

import {taskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemFormAddItem} from "./components/AddItemFormAddItemForm/AddItemFormAddItem";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type todoListType = {
    id: string
    title: string
    filter: selectedfilterType

}

type TascsStateType = {
    [key: string]: Array<taskType>
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

        let newlistTasck = tasks[todoListId]

        tasks[todoListId] = newlistTasck.map(t => (t.id === id ? {...t, isDone: isDone} : t))
        setTascks({...tasks})
        debugger

    }
    const updateTask = (id: string, newTitle: string, todoListId: string) => {

        let newlistTasck = tasks[todoListId]

        tasks[todoListId] = newlistTasck.map(t => (t.id === id ? {...t, title: newTitle} : t))
        setTascks({...tasks})
        console.log(tasks)

    }

    const removeTask = (id: string, todoListId: string) => {
        let todlistTasck = tasks[todoListId]

        tasks[todoListId] = todlistTasck.filter(t => (t.id !== id))
        setTascks({...tasks})

    }
    const filterChangeStatus = (elem: selectedfilterType, todoLostId: string) => {

        let tlist = todoList.find(tl => tl.id === todoLostId)

        if (tlist) {
            tlist.filter = elem
            setTodolist([...todoList])

        }

    }

    const addTask = (title: string, todoListId: string) => {

        let task: taskType = {id: v1(), title: title, isDone: false}
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
        setTodolist(dletedTodolist)
        delete tasks[todolistid]
        setTascks({...tasks})

    }

    const addTodolist = (title: string) => {

        const newTodolistId = v1()
        const newTodoList: todoListType = {id: newTodolistId, title: title, filter: "All"}
        setTodolist([newTodoList, ...todoList]);
        setTascks({...tasks, [newTodolistId]: []})

    }
    const onChangeNewTodolist = (newTitle: string, todoListId: string) => {

        let newTitleTodolist = todoList.map(t => (t.id === todoListId ? {...t, title: newTitle} : t))

        setTodolist(newTitleTodolist)
        console.log(newTitle, todoListId, newTitleTodolist)

    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
            <Grid container style={{padding:"30px"}}  >
            <AddItemFormAddItem newTasks={addTodolist}/>
            </Grid>
            <Grid container spacing={3} >
                {todoList.map(tl => {

                    let taskForTodoList = tasks[tl.id]
                    if (tl.filter === "Active") (taskForTodoList = taskForTodoList.filter(s => (s.isDone)))
                    else if (tl.filter === "Completed") (taskForTodoList = taskForTodoList.filter(s => (!s.isDone)))


                    return (
                        <Grid item >
                            <Paper style={{padding:"20px"}}  elevation={3}>
                                <TodoList

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
                                    setUpdTask={updateTask}
                                    onChangeNewTodolist={onChangeNewTodolist}
                                />
                            </Paper>
                        </Grid>)

                })}
            </Grid>
            </Container>
        </div>
    )


}

export default App;



