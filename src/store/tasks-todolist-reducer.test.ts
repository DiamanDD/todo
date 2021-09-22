import {TascsStateType, todoListType} from "../AppWithREDUX";
import {addTodolostAC, removeTodolostAC, todoListReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


test("correct tasks should be added", () => {
    const startTaskState:TascsStateType={}
    const starnTodolistState:Array<todoListType>=[]
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
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodolostAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
