import {v1} from "uuid";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {addTodolostAC} from "./todolists-reducer";


test("correct tasks should be added", () => {
    let todoList1 = v1()
    let todolist2 = v1()
    const title = "newtasks"
    const tasks = {
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
    }
    const newstate = tasksReducer(tasks, addTaskAC(title, todolist2))

    expect(newstate[todolist2].length).toBe(4)
    expect(newstate[todoList1].length).toBe(4)
    expect(newstate[todolist2][0].title).toBe(title)

});
test("correct tasks should be deleted", () => {
    let todoList1 = v1()
    let todolist2 = v1()

    const tasks = {
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
    }
    const newstate = tasksReducer(tasks, removeTaskAC(tasks[todoList1][0].id, todoList1))

    expect(newstate[todoList1].length).toBe(3)
    expect(newstate[todolist2].length).toBe(3)
    expect(newstate[todoList1][0].title).toBe("JS")


});
test("tasks should be update", () => {
    let todoList1 = v1()
    let todolist2 = v1()
    const newtitle = "test"
    const tasks = {
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
    }
    const newstate = tasksReducer(tasks, updateTaskAC(tasks[todoList1][1].id, newtitle, todoList1))

    expect(newstate[todoList1][1].title).toBe(newtitle)
    expect(newstate[todoList1][1].isDone).toBe(true)
    expect(newstate[todoList1].length).toBe(4)
    expect(newstate[todolist2].length).toBe(3)


});
test("tasks should be change status", () => {
    let todoList1 = v1()
    let todolist2 = v1()
    const newstatus = false
    const tasks = {
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
    }
    const newstate = tasksReducer(tasks, changeStatusTaskAC(tasks[todoList1][0].id, newstatus, todoList1))

    expect(newstate[todoList1][0].isDone).toBe(false)
    expect(newstate[todoList1][1].isDone).toBe(true)
    expect(newstate[todoList1][2].isDone).toBe(false)
    expect(newstate[todoList1].length).toBe(4)
    expect(newstate[todolist2].length).toBe(3)


});
test("new property with new array should be added when new TL is added", () => {
    let todoList1 = v1()
    let todolist2 = v1()

    const tasks = {
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
    }
    const action = addTodolostAC("newTL")
    const endState = tasksReducer(tasks, action)

    const key = Object.keys(endState)
    const newkeys = key.find(k => k !== todoList1 && k !== todolist2)
    if (!newkeys) {
        throw  Error("ff")

    }

    expect(key.length).toBe(3)
    expect(endState[newkeys]).toEqual([])


});