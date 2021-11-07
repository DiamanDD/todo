
import {addTodolostAC, removeTodolostAC, TodoListDomainType, todoListReducer} from "./todolists-reducer";
import {TascsStateType, tasksReducer} from "./tasks-reducer";
import { TaskStatuses } from "../api/todolosts-api";


test("correct tasks should be added", () => {
    const startTaskState:TascsStateType={}
    const starnTodolistState:Array<TodoListDomainType>=[]
    const action=addTodolostAC("newTL")
    const endTasksState=tasksReducer(startTaskState,action)
    const endTodolistState=todoListReducer(starnTodolistState,action)


    const keys=Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist=endTodolistState[0].id


    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolist).toBe(action.todolistId)


});
test('property with todolistId should be deleted', () => {
    const startState: TascsStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
            { id: "2", title: "JS", status:TaskStatuses.Competed,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
            { id: "3", title: "React", status:TaskStatuses.New,todoListId:"todoList1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 },
            { id: "2", title: "milk", status:TaskStatuses.Competed,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0},
            { id: "3", title: "tea", status:TaskStatuses.New,todoListId:"todolistId1",addedDate:"",startDate:"",description:"--",deadline:",",order:0,priority:0 }
        ]
    };

    const action = removeTodolostAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
