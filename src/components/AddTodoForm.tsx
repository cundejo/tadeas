import { CaretUpOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React, { ChangeEvent, useState } from 'react';

const AddTodoForm = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createTask = async (title: string) => {
    console.log('Created new task', title);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCreateTask = async () => {
    setIsLoading(true);
    await createTask(value);
    setValue('');
    setIsLoading(false);
  };

  return (
    <div className="add-task-form">
      <Row gutter={16}>
        <Col xs={20}>
          <Input
            disabled={isLoading}
            size="large"
            placeholder="Add task"
            value={value}
            onChange={handleChange}
            onPressEnter={handleCreateTask}
          />
        </Col>
        <Col xs={4}>
          <Button type="primary" size="large" block loading={isLoading} onClick={handleCreateTask}>
            <CaretUpOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddTodoForm;
