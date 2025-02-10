import React from 'react';

import Task from './Task';
import './TaskList.css';

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          done={task.done}
          created={task.created}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
