import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, } from "react-router-dom"
import './TaskScreen.scss';
import './InitialScreen'
import { Button, Col, Descriptions, Input, MenuProps, Modal, Radio, RadioChangeEvent, Row, Select, Space } from "antd";
import { AntDesignOutlined, CaretRightOutlined, DoubleLeftOutlined, DownOutlined, FilterOutlined, MoreOutlined, PlusSquareOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import { idText } from "typescript";
import { Value } from "sass";
import Dropdown from "antd/es/dropdown/dropdown";
import { title } from "process";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import TaskModel from "./TaskModel";

export default function Taskscreen() {
    const naviagte = useNavigate();
    const dispatch = useDispatch()
    const taskList = useSelector((state: any) => state?.tasks?.tasks)
    console.log('tasksList==>', taskList)
    const handleNavigate = () => {
        naviagte('/',)


    }


    const [selectedValue, setSelectedValue] = useState<string | undefined>("All");
    const options: any = [
        { id: 0,value:'All',label:'All'},
        { id: 1, value: 'yet-to-start', label: 'Yet-to-start' },
        { id: 2, value: 'in-progress', label: 'In-progress' },
        { id: 3, value: 'completed', label: 'Completed' },
    ];


    console.log('selectedValue==>',selectedValue);
    
    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    const [isModelOpen, setIsModalOpen] = useState(false);

    const [modalType, setmodalType] = useState<string>('add');

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteresTask, setFilteresTask] = useState<any>();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        addTaskFunction()

    };
    const handleCancel = () => {
        setIsModalOpen(false);

    };

    const addTaskFunction = () => {
        setIsModalOpen(!isModelOpen)
    }
    const addTaskFunc = () => {
        setIsModalOpen(!isModelOpen)
    }

    const handleChangeSearch = (e: any) => {
        setSearchTerm(e.target.value)

    }


    useEffect(() => {

        let filtered = taskList

        if (searchTerm) {
            filtered = filtered.filter((task: any) =>
                task.title.toLowerCase().includes(searchTerm)
            )
        }
        if(selectedValue!=='All'){
            filtered = filtered.filter((task: any) =>
                task.status.toLowerCase().includes(selectedValue)
            )
        }
        setFilteresTask(filtered)

    }, [searchTerm,selectedValue,taskList])
    console.log('filteresTask==>', filteresTask);

    return (
        <div>

            <div className="Button">
                {/* Back button */}
                <Button className="back-button" onClick={handleNavigate} type="primary" size="large" icon={<DoubleLeftOutlined />}>
                    Back
                </Button>

                {/* Add button */}

                <Space>
                    <Button className="add-button" type="primary" size="large" icon={<PlusSquareOutlined />} onClick={() => addTaskFunc()}>
                        Add
                    </Button>
                </Space>

            </div>
            <div className="Navbar">
                <div>
                    <Search
                        placeholder="Search by title"
                        onChange={handleChangeSearch}
                    />
                </div>
                <div>
                    <Select
                        defaultValue="Select"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={options}
                        value={selectedValue} />

                </div>
            </div>



            <div className="task-container" >
                <Row gutter={20}>
                    {(filteresTask || [])?.map((taskArrayItem: any) => {
                        return (
                            <Col span={8} xs={24} sm={24} md={8}>
                                <TaskCard
                                    task={taskArrayItem}
                                />
                            </Col>
                        )
                    })
                    }
                </Row>
            </div>
            <TaskModel
                visible={isModelOpen}
                onClose={() => setIsModalOpen(!isModelOpen)}
                type={modalType}
            />
        </div>
    )
}