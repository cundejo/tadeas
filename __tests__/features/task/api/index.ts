import { removeTask, Task, taskHasChanges, updateTasks } from '@/features/task';

const now = new Date().toISOString();
let task1: Task;
let task2: Task;
let oldTasks: Task[];
let newTasks: Task[];

beforeEach(() => {
  task1 = { id: '1', title: 'Title 1', createdAt: now };
  task2 = { id: '2', title: 'Title 2', createdAt: now };
  oldTasks = [{ ...task1 }, { ...task2 }];
  newTasks = [{ ...task1 }, { ...task2 }];
});

describe('taskHasChanges', () => {
  it('should throw an error', () => {
    expect(() => {
      taskHasChanges(task1, task2);
    }).toThrow('Comparing 2 different tasks, Prev Task Id: 1, New Task Id: 2');
  });

  it('should return true', () => {
    task2.id = '1';
    expect(taskHasChanges(task1, task2)).toBe(true);
  });

  it('should return false', () => {
    task2.id = '1';
    task2.title = 'Title 1';
    expect(taskHasChanges(task1, task2)).toBe(false);
  });
});

describe('updateTasks', () => {
  it('should return tasks array with one task updated', () => {
    newTasks.shift();
    newTasks[0].title = 'Title 2 updated';
    const updatedTasks = updateTasks(oldTasks, newTasks);
    expect(updatedTasks.length).toBe(2);
    expect(updatedTasks[1].title).toBe('Title 2 updated');
  });

  it('should return tasks array with only the first task updated', () => {
    newTasks[0].title = 'Title 1 updated';
    const updatedTasks = updateTasks(oldTasks, newTasks);
    expect(updatedTasks.length).toBe(2);
    expect(updatedTasks[0].title).toBe('Title 1 updated');
    expect(updatedTasks[1].title).toBe('Title 2');
  });

  it('should return array with 2 new tasks at the end', () => {
    newTasks[0].id = '3';
    newTasks[1].id = '4';
    const updatedTasks = updateTasks(oldTasks, newTasks);
    expect(updatedTasks.length).toBe(4);
    expect(updatedTasks[2].title).toBe('Title 1');
    expect(updatedTasks[3].title).toBe('Title 2');
  });

  it('should return array with new task at the end and the first updated', () => {
    newTasks[0].title = 'Title 1 updated';
    newTasks[1].id = '3';
    const updatedTasks = updateTasks(oldTasks, newTasks);
    expect(updatedTasks.length).toBe(3);
    expect(updatedTasks[0].title).toBe('Title 1 updated');
    expect(updatedTasks[2].title).toBe('Title 2');
  });

  it('should return the same old tasks because new tasks is empty', () => {
    newTasks[0].title = 'Title 1 updated';
    newTasks[1].id = '3';
    const updatedTasks = updateTasks(oldTasks, []);
    expect(updatedTasks.length).toBe(2);
    expect(updatedTasks[0].title).toBe('Title 1');
    expect(updatedTasks[1].title).toBe('Title 2');
  });
});

describe('removeTask', () => {
  it('should remove first task', () => {
    const { tasks, taskDeleted } = removeTask(oldTasks, task1);
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Title 2');
    expect(taskDeleted.title).toBe('Title 1');
  });

  it('should remove last task', () => {
    const { tasks, taskDeleted } = removeTask(oldTasks, task2);
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Title 1');
    expect(taskDeleted.title).toBe('Title 2');
  });

  it('should not remove any task because is not in the list', () => {
    task2.id = '3';
    const { tasks, taskDeleted } = removeTask(oldTasks, task2);
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Title 1');
    expect(tasks[1].title).toBe('Title 2');
    expect(taskDeleted.title).toBe('Title 2');
  });
});
