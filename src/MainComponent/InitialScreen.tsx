import { Button } from "antd";
import "./InitialScreen.scss";
import { useNavigate } from "react-router";

export default function InitialScreen() {
    const navigate =  useNavigate()
    const gotoTaskScreen=()=>{
        navigate('/task-screen')
    }
    return (
            <div className="background-container mid-center">
                <div>
                    <div className="task-title"> TASK MASTER </div>

                    <div className="Task-Initialscreen-content">
                        This productive tool is designed to help you better manage your task project-wise conveniently
                    </div>

                    <div className="Task-Initialscreen-button"
                    onClick={() => {gotoTaskScreen()}} 
                    >
                        <Button type="primary" danger>
                            Let's start
                        </Button>
                    </div>
                </div>
            </div>
    )
}
