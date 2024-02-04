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
            <span className="created">{time}</span>
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
