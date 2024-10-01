import React, { useState } from 'react';
import { Card, Button, Dropdown, Menu, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import TaskModal from './TaskModel';
import { deleteTask } from './Action';
import { MoreOutlined } from '@ant-design/icons';


interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'add'>('view');
  const dispatch = useDispatch();

  const confirmDelete = (task:any) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete the task "${task.title}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteTask(task.id));
      },
    });
  };

  const handleMenuClick = (e: any) => {
    if (e.key === 'edit') {
      setModalType('edit');
      setIsModalVisible(true);
    } else if (e.key === 'view') {
      setModalType('view');
      setIsModalVisible(true);
    } else if (e.key === 'delete') {
      // if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      //   dispatch(deleteTask(task.id));
        
      // }
      confirmDelete(task);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <Card title={task.title} 
    style={{
      marginBottom:"10px"
    }}
    extra={<Dropdown overlay={menu}><Button><MoreOutlined/></Button></Dropdown>}>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <TaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        task={task}
        type={modalType}
      />
    </Card>
  );
};

export default TaskCard;
