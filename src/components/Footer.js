import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Footer.css";

class Footer extends Component {

  static defaultProps = {
    selected: "All",
    activeCount: 0,
    onClearCompleted: () => {},
    onActive: () => {},
    onComplited: () => {},
    onAll: () => {}
  };


  static propTypes = {
    selected: PropTypes.string,
    activeCount: PropTypes.number,
    onClearCompleted: PropTypes.func,
    onActive: PropTypes.func,
    onComplited: PropTypes.func,
    onAll: PropTypes.func
  };

  render() {
    const {onClearCompleted, onActive, onComplited, onAll, selected, activeCount } = this.props;
    
    return (
      <footer className="footer">
        <span className="todo-count">
          {activeCount} {activeCount === 1 ? "item" : "items"} left
        </span>
        <ul className="filters">
          <li>
            <button className={selected === "All" ? "selected" : ""} onClick={onAll}>All</button>
          </li>
          <li>
            <button className={selected === "Active" ? "selected" : ""} onClick={onActive}>Active</button>
          </li>
          <li>
            <button className={selected === "Completed" ? "selected" : ""} onClick={onComplited}>Completed</button>
          </li>
        </ul>
        <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
      </footer>
    );
  }
}

export default Footer;
