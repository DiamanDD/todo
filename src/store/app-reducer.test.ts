import {appReducer, initialStartstate, setErrorMessageAC, setStatusMessageAC} from "./app-reducer";

let startState:initialStartstate

beforeEach(()=>{
    startState={
        status: 'idle',
        error:null,
        isInitialized:false
    }
})
test("correct message error should be", () => {
    const endState=appReducer(startState,setErrorMessageAC({error:"someError"}))
    expect(endState.error).toBe("someError")

});
test("correct status should be", () => {
    const endState=appReducer(startState,setStatusMessageAC({status:'loading'}))
    expect(endState.status).toBe('loading')


});