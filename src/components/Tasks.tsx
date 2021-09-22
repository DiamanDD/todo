import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, Grid, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {taskType} from "./TodoList";

type TasksProps = {
    tasks: taskType
    todolistId:string

    removeItems: (id: string, todoListId: string) => void
    setActiveChecked: (id: string, isDone: boolean, todoListId: string) => void
    setUpdTask: (id: string, newTitle: string, todoListId: string) => void
}
export const Tasks =React.memo( (props: TasksProps) => {
    const {tasks,setUpdTask,todolistId,setActiveChecked,removeItems}=props
    const deleteTasks = () => removeItems(tasks.id, todolistId)
    const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => setActiveChecked(tasks.id, e.currentTarget.checked, todolistId)
    const onChangeNewTask =useCallback( (newTitle: string) => setUpdTask(tasks.id, newTitle, todolistId),[setUpdTask,todolistId,tasks.id])

    return (

        <div key={tasks.id}>
            <Grid container
            >
                <Grid item xs>
                    <Checkbox
                        id={tasks.id}

                        checked={tasks.isDone}
                        onChange={onChangeCheked}
                        name="checkedB"
                        color="primary"
                    />
                </Grid>

                <Grid item xs={4}>
                    <EditableSpan title={tasks.title} onChange={onChangeNewTask}/>
                </Grid>
                <Grid item xs>
                    <IconButton aria-label="delete" onClick={deleteTasks}>
                        <Delete/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>

    )
})