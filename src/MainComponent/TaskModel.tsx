import { Modal, Input, Select, Form } from "antd";
// import form from "antd/es/form";
import { type } from "os";
import { useLocation, useNavigate } from "react-router-dom";
import './TaskScreen';
import { addTask, updateTask } from "./Action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

interface TaskModalProps {
  visible: boolean,
  onClose: () => void,
  type: string,
  task?: any
}

export default function TaskModal(props: TaskModalProps) {
  const {
    visible,
    onClose,
    type,
    task

  } = props
  const location = useLocation();
  const naviagte = useNavigate();
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const handleNavigate = () => {
    naviagte('/',)
  }

  useEffect(() => {
    if ((type === 'edit' || type === 'view') && task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
      })
    }
  }, [task, type, form])
  
  const handleOk = () => {
    form.validateFields()
      .then(values => {
        if (type === 'edit' && task) {
          dispatch(updateTask({ ...task, ...values }));
        } else {
          dispatch(addTask({
            id: uuidv4(),
            ...values
          }));
        }
        
        onReset();
      })
      .catch(errorInfo => {
        console.error('Validation Failed:', errorInfo);
      });
  };

  const onReset = () => {
    form.resetFields();
    onClose()
  };
  return (
    <div>
      <Modal
        title={type === 'edit' ? 'Edit Task' : type === 'view' ? 'View Task' : 'Add Task'}
        visible={visible}
        onOk={type !== 'view' ? handleOk : onReset}
        onCancel={onReset}
        okText="Save"
        cancelText="Cancel"
        footer={type === 'view' ? null : undefined}
        okButtonProps={{ disabled: type === 'view' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'Yet-to-start' }}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: type !== 'view' ? true : false }]}>
            <Input
              disabled={type === 'view'}
              style={{
                color: 'black',
                background: 'white',
                border: type === 'view' ? 'none' : ''
              }}

            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: type !== 'view' ? true : false }]}>
            <Input.TextArea
              disabled={type === 'view'}
              style={{
                color: 'black',
                boxShadow: 'none',
                overflow: 'hidden',
                background: 'white',
                border: type === 'view' ? 'none' : '',
                resize: 'none'

              }}

            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: type !== 'view' ? true : false }]}>
            {type !== 'view' ?
              <Select
                style={{
                  background: 'white!important',
                  color: 'black',
                }}
              >
                <Select.Option value="Yet-to-start">Yet-to-start</Select.Option>
                <Select.Option value="In-Progress">In-Progress</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
              :
              <span>{form.getFieldValue('status')}
              </span>
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}