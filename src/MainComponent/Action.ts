import { createAction } from "@reduxjs/toolkit";


export const addTask = createAction<any>('tasks/addTask')
export const updateTask = createAction<any>('tasks/updateTask')
export const deleteTask = createAction<any>('tasks/deleteTask')