import { Checkbox, List } from 'antd';
import React from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import './ItemsList.sass';
import { firestore } from 'firebase';

interface Task {
  id: string;
  createdAt: firestore.Timestamp;
  finished: boolean;
  title: string;
}

const ItemsList = () => {
  const taskRef = useFirestore().collection('todos');

  const query = taskRef.orderBy('finished').orderBy('createdAt', 'desc');

  const tasks = useFirestoreCollectionData<Task>(query, { idField: 'id' });

  const updateTodo = (task: Task) => {
    console.log('todo', task);
    taskRef.doc(task.id).update({ finished: !task.finished });
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
