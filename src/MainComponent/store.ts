import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tasksReducer from './taskSlice';

const persistConfig={
    key:'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig,tasksReducer);
export const store = configureStore({
    reducer:{
        tasks:persistedReducer,
    }
})
export const persistor = persistStore(store)