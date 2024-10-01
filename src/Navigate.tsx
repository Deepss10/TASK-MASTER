import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialScreen from "./MainComponent/InitialScreen";
import TaskScreen from "./MainComponent/TaskScreen";

export default  function  Navigate(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/"
            element={<InitialScreen/>}
            />
             <Route path="/task-screen"
            element={<TaskScreen/>}
            />
            <Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}