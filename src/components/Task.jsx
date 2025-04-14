import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: props.description,
    };
  }

  componentDidUpdate(prevProps) {
    // Если изменился description и задача НЕ в режиме редактирования, обновляем текст
    if (prevProps.description !== this.props.description && !this.props.isEditing) {
      this.setState({ editText: this.props.description });
    }
  }

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  handleChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleSave = () => {
    const { editText } = this.state;
    if (editText.trim()) {
      this.props.onEdit(this.props.id, editText);
    }
    this.props.onStopEditing();
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSave();
    } else if (event.key === 'Escape') {
      this.props.onStopEditing();
    }
  };

  render() {
    const {
      id,
      description,
      done,
      onToggle,
      onDelete,
      isEditing,
      onStartEditing,
      onStartTimer,
      onStopTimer,
      timeLeft,
    } = this.props;
    const { editText } = this.state;

    return (
      <li className={done ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggle} />
          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleChange}
              onBlur={this.handleSave}
              onKeyDown={this.handleKeyDown}
              autoFocus
            />
          ) : (
            <label>
              <span className="description">{description}</span>
              <span className="created">
                <button className="icon icon-play" onClick={onStartTimer}></button>
                <button className="icon icon-pause" onClick={onStopTimer}></button>
                {this.formatTime(timeLeft)}
              </span>
              <span className="created">{formatDistanceToNow(new Date(this.props.created), { addSuffix: true })}</span>
            </label>
          )}
          {!isEditing && <button type="button" className="icon icon-edit" onClick={() => onStartEditing(id)} />}
          <button type="button" className="icon icon-destroy" onClick={onDelete} />
        </div>
      </li>
    );
  }
}
