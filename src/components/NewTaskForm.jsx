import React, { Component } from 'react';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({ min: e.target.value });
  };

  onSecChange = (e) => {
    this.setState({ sec: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddTask } = this.props; // Деструктуризация props
    const { label, min, sec } = this.state; // Деструктуризация state

    onAddTask(label, min, sec);
    this.setState({ label: '', min: '', sec: '' });
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="Task" onChange={this.onLabelChange} value={label} />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinChange}
          value={min}
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          value={sec}
          type="number"
        />
        <button type="submit"></button>
      </form>
    );
  }
}

export default NewTaskForm;
