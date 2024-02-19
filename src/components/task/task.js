import React, { useState, useEffect } from 'react';
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
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState({ min: todoTimerMin, sec: todoTimerSec });

  useEffect(() => {
    if (className === 'completed') {
      setTimerActive(false);
      setTimer({ min: 0, sec: 0 });
    }
  }, [className]);

  useEffect(() => {
    let intervalId;
    if (timerActive) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (className === 'completed') {
            clearInterval(intervalId);
            return { min: 0, sec: 0 };
          }
          if (prevTimer.min === 0 && prevTimer.sec === 0) {
            clearInterval(intervalId);
            eventStatusEdit();
            return { min: 0, sec: 0 };
          }
          if (prevTimer.sec === 0) {
            return { min: prevTimer.min - 1, sec: 59 };
          }
          return { ...prevTimer, sec: prevTimer.sec - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerActive, className, eventStatusEdit]);

  const timerPlay = () => {
    setTimerActive(true);
  };

  const timerPause = () => {
    setTimerActive(false);
  };

  const eventEnter = (e) => {
    if (e.keyCode === 13) {
      eventDiscriptionEdit(e.target.value);
    }
  };

  const time = formatDistanceToNow(timeCreated, { addSuffix: true });

  let filtredClassName = className;
  if (filter === 'Active' && className === 'completed') {
    filtredClassName = `${className} dspl-none`;
  }
  if (filter === 'Completed' && className !== 'completed') {
    filtredClassName = `${className} dspl-none`;
  }

  return (
    <li className={filtredClassName}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={className !== 'view'}
          onClick={() => {
            eventStatusEdit();
          }}
          readOnly
        />
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

export default class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: false,
      timerMin: 0,
      timerSec: 0,
    };
    // eslint-disable-next-line no-unused-vars
    let timerTimeout;
  }

  componentDidMount() {
    this.setState({
      timerMin: this.props.todoTimerMin,
      timerSec: this.props.todoTimerSec,
    });
  }

  componentDidUpdate() {
    if (this.props.className === 'completed' && this.state.timerMin + this.state.timerSec !== 0) {
      this.setState({
        timerMin: 0,
        timerSec: 0,
        timer: false,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerTimeout);
  }

  // нажатие Enter
  eventEnter = (e) => {
    if (e.keyCode === 13) {
      this.props.eventDiscriptionEdit(e.target.value);
    }
  };

  // пуск таймера
  timerPlay = () => {
    const timerAlgoritm = () => {
      const { className, eventStatusEdit } = this.props;
      const { timer, timerMin, timerSec } = this.state;
      this.timerTimeout = setTimeout(timerAlgoritm, 1000);

      if (!timer) {
        clearTimeout(this.timerTimeout);
      }
      if (className === 'completed') {
        clearTimeout(this.timerTimeout);
        this.setState(() => {
          return {
            timer: false,
          };
        });
        return;
      }
      if (!timerMin && !timerSec) {
        clearTimeout(this.timerTimeout);
        eventStatusEdit();
        return;
      }
      if (timerSec === 0) {
        this.setState({
          timerMin: timerMin - 1,
          timerSec: 59,
        });
      } else {
        this.setState({
          timerSec: timerSec - 1,
        });
      }
    };

    if (!this.state.timer) {
      this.setState(
        () => {
          return {
            timer: true,
          };
        },
        () => {
          this.timerTimeout = setTimeout(timerAlgoritm, 1000);
        }
      );
    }
  };

  // пауза таймера
  timerPause = () => {
    if (this.state.timer) {
      clearTimeout(this.timerTimeout);
      this.setState(() => {
        return {
          timer: false,
        };
      });
    }
  };

  render() {
    const { filter, className, discription, timeCreated, eventStatusEdit, eventDiscriptionEdit, eventDelete } =
      this.props;
    const { timerMin, timerSec } = this.state;
    const time = formatDistanceToNow(timeCreated, { addSuffix: true });

    // фильтрация
    let filtredClassName = className;
    if (filter === 'Active' && className === 'completed') {
      filtredClassName = `${className} dspl-none`;
    }
    if (filter === 'Completed' && className !== 'completed') {
      filtredClassName = `${className} dspl-none`;
    }

    return (
      <li className={filtredClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={className !== 'view'} onClick={eventStatusEdit} readOnly />
          <label htmlFor="task">
            <span className="title">{discription}</span>
            <span className="created">{time}</span>
            <span className="description">
              <button
                aria-label="button-play"
                type="button"
                className="icon icon-play"
                onClick={() => this.timerPlay()}
              />
              <button
                aria-label="button-pause"
                type="button"
                className="icon icon-pause"
                onClick={() => this.timerPause()}
              />
              <p className="timer">
                {timerMin.toString().length === 1 ? `0${timerMin}` : timerMin}:
                {timerSec.toString().length === 1 ? `0${timerSec}` : timerSec}
              </p>
            </span>
          </label>
          <button type="button" aria-label="Edit" className="icon icon-edit" onClick={eventDiscriptionEdit} />
          <button type="button" aria-label="Destroy" className="icon icon-destroy" onClick={eventDelete} />
        </div>
        <input type="text" className="edit" defaultValue={discription} onKeyDown={this.eventEnter} />
      </li>
    );
  }
}

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
*/
