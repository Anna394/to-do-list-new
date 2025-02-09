import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = { timeAgo: this.getTimeAgo() };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ timeAgo: this.getTimeAgo() });
    }, 5000); // Обновлять каждые 5 секунд
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTimeAgo() {
    const { created } = this.props;
    return formatDistanceToNow(new Date(created), {
      addSuffix: true,
    });
  }

  render() {
    const { description, done, onToggle, onDelete } = this.props;
    const { timeAgo } = this.state;
    return (
      <li className={done ? 'completed' : ''}>
        <div className="view">
          <label htmlFor="Task">
            <input id="Task" className="toggle" type="checkbox" checked={done} onChange={onToggle} />
            <span className="description">{description}</span>
            <span className="created">{timeAgo}</span>
          </label>
          <button type="button" className="icon icon-edit" />
          <button type="button" className="icon icon-destroy" onClick={onDelete} />
        </div>
      </li>
    );
  }
}
