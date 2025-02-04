
import React, { Component } from "react";
import "./Task.css"; 
import { formatDistanceToNow } from "date-fns"


export default class Task extends Component {

  static defaultProps = {
    created: Date.now(),
    done: true
  };

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
    return formatDistanceToNow(new Date(this.props.created), { addSuffix: true });
  }

  render() {
    const { description, done, onToggle, onDelete } = this.props;
    return (
      <li className={done ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onToggle}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{this.state.timeAgo}</span>
          </label>
          <button class="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
      </li>
    );
  }
}


