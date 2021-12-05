import {appReducer, initialStartstate, setErrorMessageAC, setStatusMessageAC} from "./app-reducer";

let startState:initialStartstate

beforeEach(()=>{
    startState={
        status: 'idle',
        error:null
    }
})

test("correct message error should be", () => {


    const endState=appReducer(startState,setErrorMessageAC("someError"))


    expect(endState.error).toBe("someError")


});
test("correct status should be", () => {


    const endState=appReducer(startState,setStatusMessageAC('loading'))


    expect(endState.status).toBe('loading')


});