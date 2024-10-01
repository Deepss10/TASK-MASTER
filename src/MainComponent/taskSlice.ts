import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, updateTask } from "./Action";
import { stringify } from "querystring";



interface Task {
    id:string,
    title:string,
    description:string,
    status:string

}

interface TasksState{
    tasks:Task[]
}

const initialState : TasksState ={
    tasks:[

    ]
}


const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addTask,(state,action)=>{
            state.tasks.push(action.payload)
        })
        .addCase(updateTask,(state,action)=>{
          const index=state.tasks.findIndex((task)=>task.id===action.payload.id);
          if(index!==-1){
            state.tasks[index] = action.payload
          }
        })
        .addCase(deleteTask,(state,action)=>{
            state.tasks =state.tasks.filter((task)=>task.id!==action.payload)
        }) 
        .addMatcher((action)=>
        [addTask.type,updateTask.type,,deleteTask.type].includes(action.type),(state)=>{
            localStorage.setItem('tasks',JSON.stringify(state.tasks));
        }
    );
    },
});
export default taskSlice.reducer;