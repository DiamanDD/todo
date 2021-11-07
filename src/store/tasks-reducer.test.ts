import {v1} from "uuid";
import { TaskStatuses } from "../api/todolosts-api";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {addTodolostAC} from "./todolists-reducer";


test("correct tasks should be added", () => {
    let todoList1 = v1()
    let todolist2 = v1()
    const title = "newtasks"
    const tasks = {
        [todoList1]: [
            {id: v1(), title: "CSS", status:TaskStatuses.Competed,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "JS", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React-Native", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}
        ],
        [todolist2]: [
            {id: v1(), title: "CSS", status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "JS", status:TaskStatuses.New,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},

        ]
    }
    const newstate = tasksReducer(tasks, addTaskAC(title, todolist2))

    expect(newstate[todolist2].length).toBe(3)
    expect(newstate[todoList1].length).toBe(4)
    expect(newstate[todolist2][0].title).toBe(title)

});
test("correct tasks should be deleted", () => {
    let todoList1 = v1()
    let todolist2 = v1()

    const tasks = {
        [todoList1]: [
            {id: v1(), title: "CSS", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "JS",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React-Native",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}
        ],
        [todolist2]: [
            {id: v1(), title: "milk",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "bread",  status:TaskStatuses.New,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "petr",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},

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
            {id: v1(), title: "CSS", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "JS",  status:TaskStatuses.Competed,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React-Native",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}

        ],
        [todolist2]: [
            {id: v1(), title: "milk",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "bread",  status:TaskStatuses.New,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "petr",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},


        ]
    }
    const newstate = tasksReducer(tasks, updateTaskAC(tasks[todoList1][1].id, newtitle, todoList1))

    expect(newstate[todoList1][1].title).toBe(newtitle)
    expect(newstate[todoList1][1].status).toBe(2)
    expect(newstate[todoList1].length).toBe(4)
    expect(newstate[todolist2].length).toBe(3)


});
test("tasks should be change status", () => {
    let todoList1 = v1()
    let todolist2 = v1()
    const newstatus = 0
    const tasks = {
        [todoList1]: [
            {id: v1(), title: "CSS", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "JS",  status:TaskStatuses.Competed,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React-Native",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}

        ],
        [todolist2]: [
            {id: v1(), title: "milk",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "bread",  status:TaskStatuses.New,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "petr",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},


        ]
    }
    const newstate = tasksReducer(tasks, changeStatusTaskAC(tasks[todoList1][0].id, newstatus, todoList1))

    expect(newstate[todoList1][0].status).toBe(0)
    expect(newstate[todoList1][1].status).toBe(2)
    expect(newstate[todoList1][2].status).toBe(0)
    expect(newstate[todoList1].length).toBe(4)
    expect(newstate[todolist2].length).toBe(3)


});
test("new property with new array should be added when new TL is added", () => {
    let todoList1 = v1()
    let todolist2 = v1()

    const tasks = {
        [todoList1]: [
            {id: v1(), title: "CSS", status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "JS",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "React-Native",  status:TaskStatuses.New,todoListId:todoList1,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0}

        ],
        [todolist2]: [
            {id: v1(), title: "milk",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "bread",  status:TaskStatuses.New,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            {id: v1(), title: "petr",  status:TaskStatuses.Competed,todoListId:todolist2,addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},


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