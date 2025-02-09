import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

function Footer({ onClearCompleted, onActive, onComplited, onAll, selected, activeCount }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        <li>
          <button type="button" className={selected === 'All' ? 'selected' : ''} onClick={onAll}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={selected === 'Active' ? 'selected' : ''} onClick={onActive}>
            Active
          </button>
        </li>
        <li>
          <button type="button" className={selected === 'Completed' ? 'selected' : ''} onClick={onComplited}>
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  selected: 'All',
  activeCount: 0,
  onClearCompleted: () => {},
  onActive: () => {},
  onComplited: () => {},
  onAll: () => {},
};

Footer.propTypes = {
  selected: PropTypes.string,
  activeCount: PropTypes.number,
  onClearCompleted: PropTypes.func,
  onActive: PropTypes.func,
  onComplited: PropTypes.func,
  onAll: PropTypes.func,
};

export default Footer;
