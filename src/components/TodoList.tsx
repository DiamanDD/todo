import React, {ChangeEvent, KeyboardEvent, useState} from "react";


export type taskType = {
    id: string;
    title: string;
    isDone: boolean;
}


export type propsType = {
    titles: string;
    tasks: Array<taskType>
    removeItems: (id: string) => void
    selectedParametr: (value: "All" | "Active" | "Completed") => void
    newTasks: (title: string) => void
    selectedfilter: "All" | "Active" | "Completed"
    setActiveChecked: (id: string, isDone: boolean) => void


}


export const TodoList = (props: propsType) => {

    const [error, seterror] = useState("")
    const setError = error ? <div className={"textError"}>{error}</div> : null
    const addTask = () => {
        title ? props.newTasks(title.trim()) : seterror("Поле пустое")
        setTitel("")
    }
    let [title, setTitel] = useState("")
    const onChangeHandler = (t: ChangeEvent<HTMLInputElement>) => {
        setTitel(t.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        seterror("")
        if (e.charCode === 13) {
            addTask()
        }

    }
    const onClickALL = () => {

        return (props.selectedParametr("All"))
    }
    const onClickActive = () => (props.selectedParametr("Active"))
    const onClickCompleted = () => (props.selectedParametr("Completed"))

    return (
        <div>
            <h3>{props.titles}</h3>
            <div>
                <input value={title}
                       className={error ? "error" : ""}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {setError}
            </div>
            <ul>

                {

                    props.tasks.map((elem) => {
                        const deleteTasks = () => props.removeItems(elem.id)
                        const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.setActiveChecked(elem.id, e.currentTarget.checked)
                        }
                        return (

                            <li key={elem.id}><input
                                type="checkbox"
                                checked={elem.isDone}
                                onChange={onChangeCheked}
                            />
                                <span>{elem.title}</span>
                                <button onClick={deleteTasks}>x</button>

                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button className={props.selectedfilter === "All" ? "colorButtonFielter" : ""} onClick={onClickALL}>All
                </button>
                <button className={props.selectedfilter === "Active" ? "colorButtonFielter" : ""}
                        onClick={onClickActive}>Active
                </button>
                <button className={props.selectedfilter === "Completed" ? "colorButtonFielter" : ""}
                        onClick={onClickCompleted}>Completed
                </button>
            </div>
        </div>


    )
}


