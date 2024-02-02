/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

function Task({ className, discription, timeCreated, eventStatusEdit, eventDiscriptionEdit, eventDelete }) {
  const time = formatDistanceToNow(timeCreated, { addSuffix: true });

  // нажатие Enter
  const eventEnter = (e) => {
    if (e.keyCode === 13) {
      eventDiscriptionEdit(e.target.value);
    }
  };

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={className === 'view' ? '' : 'true'}
          onClick={eventStatusEdit}
        />
        <label htmlFor="task">
          <span className="title">{discription}</span>
          <span className="description">
            <button type="button" className="icon icon-play" />
            <button type="button" className="icon icon-pause" />
            <p className="timer">12:25</p>
          </span>
          <span className="created">{time}</span>
        </label>
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={eventDiscriptionEdit} />
        <button type="button" aria-label="Destroy" className="icon icon-destroy" onClick={eventDelete} />
      </div>
      <input type="text" className="edit" defaultValue={discription} onKeyDown={eventEnter} />
    </li>
  );
}

Task.defaultProps = {
  className: 'view',
  discription: '',
  timeCreated: Date.now(),
  eventStatusEdit: () => {},
  eventDiscriptionEdit: () => {},
  eventDelete: () => {},
};

Task.propTypes = {
  className: PropTypes.string,
  discription: PropTypes.string,
  timeCreated: PropTypes.number,
  eventStatusEdit: PropTypes.func,
  eventDiscriptionEdit: PropTypes.func,
  eventDelete: PropTypes.func,
};

export default Task;
