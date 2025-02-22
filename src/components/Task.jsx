import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: props.description, // Начальный текст
    };
  }

  componentDidUpdate(prevProps) {
    // Если изменился description и задача НЕ в режиме редактирования, обновляем текст
    if (prevProps.description !== this.props.description && !this.props.isEditing) {
      this.setState({ editText: this.props.description });
    }
    console.log(`Task ${this.props.id} -> isEditing:`, this.props.isEditing); // Логируем состояние
  }

  handleChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleSave = () => {
    const { editText } = this.state;
    if (editText.trim()) {
      console.log('Сохранение задачи ID:', this.props.id, 'Текущий текст:', editText);
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
    const { id, description, done, onToggle, onDelete, isEditing, onStartEditing } = this.props;
    const { editText } = this.state;

    return (
      <li className={done ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggle} />
          {isEditing ? ( // Теперь проверяем isEditing из props
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
