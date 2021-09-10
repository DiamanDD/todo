import React, {useReducer} from "react";

import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemFormAddItem} from "./components/AddItemFormAddItemForm/AddItemFormAddItem";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolostAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodolostAC,
    todoListReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./store/tasks-reducer";

export type todoListType = {
    id: string
    title: string
    filter: selectedfilterType

}
// export type TascsStateType = {
//     [key: string]: Array<taskType>
// }
export type selectedfilterType = "All" | "Active" | "Completed"

function App1() {
    let todoList1 = v1()
    let todolist2 = v1()


    let [todoList, dispatchTodoListReducer] = useReducer(todoListReducer, [
        {id: todoList1, title: "list1", filter: "All"},
        {id: todolist2, title: "list2", filter: "All"}
    ])

    let [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
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
    const changeTodolistFilter = (filter: selectedfilterType, todoLostId: string) => {
        const action = changeTodolistFilterAC(todoLostId, filter)
        dispatchTodoListReducer(action)
    }

    const removeTodolost = (todolistid: string) => {
        const action = removeTodolostAC(todolistid)
        dispatchTodoListReducer(action)
        dispatchTasksReducer(action)

    }
    const addTodolist = (newTodoListTitle: string) => {

        const action = addTodolostAC(newTodoListTitle)
        dispatchTodoListReducer(action)
        dispatchTasksReducer(action)


    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatchTodoListReducer(action)

    }

    const changeStatusTask = (id: string, isDone: boolean, todoListId: string) => {

        const action = changeStatusTaskAC(id, isDone, todoListId)
        dispatchTasksReducer(action)

    }
    const updateTask = (id: string, newTitle: string, todoListId: string) => {
        const action = updateTaskAC(id, newTitle, todoListId)
        dispatchTasksReducer(action)

    }
    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatchTasksReducer(action)
    }
    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatchTasksReducer(action)
    }


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddItemFormAddItem newTasks={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoList.map(tl => {

                        let taskForTodoList = tasks[tl.id]
                        if (tl.filter === "Active") (taskForTodoList = taskForTodoList.filter(s => (s.isDone)))
                        else if (tl.filter === "Completed") (taskForTodoList = taskForTodoList.filter(s => (!s.isDone)))


                        return (
                            <Grid item>
                                <Paper style={{padding: "20px"}} elevation={3}>
                                    <TodoList

                                        key={tl.id}
                                        id={tl.id}
                                        titles={tl.title}
                                        removeItems={removeTask}
                                        tasks={taskForTodoList}
                                        newTasks={addTask}
                                        selectedfilter={tl.filter}
                                        setActiveChecked={changeStatusTask}
                                        deleteTodolist={removeTodolost}
                                        selectedParametr={changeTodolistFilter}
                                        setUpdTask={updateTask}
                                        onChangeNewTodolist={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>)

                    })}
                </Grid>
            </Container>
        </div>
    )


}

export default 1



