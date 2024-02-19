import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

function Task({
  filter,
  className,
  discription,
  timeCreated,
  todoTimerMin,
  todoTimerSec,
  eventStatusEdit,
  eventDiscriptionEdit,
  eventDelete,
}) {
  const [timer, setTimer] = useState({ min: 0, sec: 0 });
  const ref = useRef(null);

  useEffect(() => {
    setTimer({ min: todoTimerMin, sec: todoTimerSec });
    return () => clearTimeout(ref.current);
  }, []);

  useEffect(() => {
    if (className === 'completed' && timer.min + timer.sec !== 0) {
      setTimer({ min: 0, sec: 0 });
    }
  });

  const eventEnter = (e) => {
    if (e.keyCode === 13) {
      eventDiscriptionEdit(e.target.value);
    }
  };

  const timerPlay = () => {
    const timerAlgoritm = () => {
      ref.current = setTimeout(() => timerAlgoritm(), 1000);
      setTimer((prevTimer) => {
        if (className === 'completed') {
          clearTimeout(ref.current);
          return;
        }
        if (!prevTimer.min && !prevTimer.sec) {
          clearTimeout(ref.current);
          eventStatusEdit();
          return;
        }
        if (prevTimer.sec === 0) {
          return {
            min: prevTimer.min - 1,
            sec: 59,
          };
        }
        return {
          min: prevTimer.min,
          sec: prevTimer.sec - 1,
        };
      });
    };

    if (!ref.current) {
      setTimeout(timerAlgoritm(), 1000);
    }
  };

  const timerPause = () => {
    clearTimeout(ref.current);
    ref.current = null;
  };

  const time = formatDistanceToNow(timeCreated, { addSuffix: true });

  let filtredClassName = className;
  if (filter === 'Active' && className === 'completed') {
    filtredClassName = `${className} dspl-none`;
  }
  if (filter === 'Completed' && className !== 'completed') {
    filtredClassName = `${className} dspl-none`;
  }
  console.log(timer);
  return (
    <li className={filtredClassName}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={className !== 'view'} onClick={eventStatusEdit} readOnly />
        <label htmlFor="task">
          <span className="title">{discription}</span>
          <span className="created">{time}</span>
          <span className="description">
            <button aria-label="button-play" type="button" className="icon icon-play" onClick={() => timerPlay()} />
            <button aria-label="button-pause" type="button" className="icon icon-pause" onClick={() => timerPause()} />
            <p className="timer">
              {timer.min.toString().length === 1 ? `0${timer.min}` : timer.min}:
              {timer.sec.toString().length === 1 ? `0${timer.sec}` : timer.sec}
            </p>
          </span>
        </label>
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={eventDiscriptionEdit} />
        <button type="button" aria-label="Destroy" className="icon icon-destroy" onClick={eventDelete} />
      </div>
      <input type="text" className="edit" defaultValue={discription} onKeyDown={eventEnter} />
    </li>
  );
}

export default Task;

Task.defaultProps = {
  filter: 'All',
  className: 'view',
  discription: '',
  timeCreated: Date.now(),
  todoTimerMin: 0,
  todoTimerSec: 0,
  eventStatusEdit: () => {},
  eventDiscriptionEdit: () => {},
  eventDelete: () => {},
};

Task.propTypes = {
  filter: PropTypes.string,
  className: PropTypes.string,
  discription: PropTypes.string,
  timeCreated: PropTypes.number,
  todoTimerMin: PropTypes.number,
  todoTimerSec: PropTypes.number,
  eventStatusEdit: PropTypes.func,
  eventDiscriptionEdit: PropTypes.func,
  eventDelete: PropTypes.func,
};
