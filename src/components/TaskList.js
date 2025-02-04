import React from "react";
import Task from "./Task";
import "./TaskList.css"; 


const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;

