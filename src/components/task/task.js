import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

function Task({ className, discription, timeCreated, onClickStatusEdit, onClickDiscriptionEdit, onClickDelete }) {
  const time = formatDistanceToNow(timeCreated, { addSuffix: true });

  // enter вызывает функцию с новым значением
  const onClickEnter = (e) => {
    if (e.keyCode === 13) {
      onClickDiscriptionEdit(e.target.value);
    }
  };

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={className === 'view' ? '' : 'true'}
          onClick={onClickStatusEdit}
        />
        <label htmlFor="task">
          <span className="description">{discription}</span>
          <span className="created">{time}</span>
        </label>
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={onClickDiscriptionEdit} />
        <button type="button" aria-label="Destroy" className="icon icon-destroy" onClick={onClickDelete} />
      </div>
      <input type="text" className="edit" defaultValue={discription} onKeyDown={onClickEnter} />
    </li>
  );
}

Task.defaultProps = {
  className: 'view',
  discription: '',
  timeCreated: Date.now(),
  onClickStatusEdit: () => {},
  onClickDiscriptionEdit: () => {},
  onClickDelete: () => {},
};

export default Task;
