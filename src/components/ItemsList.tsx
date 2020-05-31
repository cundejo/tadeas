import { Checkbox, List } from 'antd';
import React from 'react';
import './ItemsList.sass';

interface Task {
  id: string;
  createdAt: Date;
  finished: boolean;
  title: string;
}

const tasks: Task[] = [
  { id: '1', createdAt: new Date(), finished: false, title: 'Task 1' },
  { id: '2', createdAt: new Date(), finished: false, title: 'Task 2' },
  { id: '3', createdAt: new Date(), finished: false, title: 'Task 3' },
];

const ItemsList = () => {
  const updateTodo = (task: Task) => {
    task.finished = !task.finished;
  };

  return (
    <div className="todo-list">
      <List
        size="large"
        dataSource={tasks}
        renderItem={(task: Task) => (
          <List.Item className={task.finished ? 'finished' : 'active'}>
            {task.title}
            <div style={{ float: 'right' }}>
              <Checkbox checked={task.finished} onChange={() => updateTodo(task)} />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ItemsList;
