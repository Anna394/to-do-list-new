import React, { Component } from 'react';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddTask } = this.props; // Деструктуризация props
    const { label } = this.state; // Деструктуризация state

    onAddTask(label);
    this.setState({ label: '' });
  };

  render() {
    const { label } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
      </form>
    );
  }
}

export default NewTaskForm;
