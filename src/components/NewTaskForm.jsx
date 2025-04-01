import React, { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ onAddTask }) {
  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddTask(label);
    setLabel('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
    </form>
  );
}

export default NewTaskForm;
