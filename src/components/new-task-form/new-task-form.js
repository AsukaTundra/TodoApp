import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      todoTitle: '',
      todoTimerMin: '',
      todoTimerSec: '',
    };
  }

  eventEnter = (e, todoTitle, todoTimerMin, todoTimerSec) => {
    if (e.keyCode === 13) {
      if (
        todoTitle &&
        (Number(todoTimerMin) || Number(todoTimerSec)) &&
        todoTimerMin.length <= 3 &&
        todoTimerSec.length <= 3
      ) {
        this.props.eventCreate(todoTitle, Number(todoTimerMin) + Math.floor(todoTimerSec / 60), todoTimerSec % 60);
        this.setState({
          todoTitle: '',
          todoTimerMin: '',
          todoTimerSec: '',
        });
      } else {
        // eslint-disable-next-line no-alert
        alert('Invalid task data');
      }
    }
  };

  constrolledInput = (e, element) => {
    this.setState({
      [element]: e.target.value,
    });
  };

  render() {
    const { todoTitle, todoTimerMin, todoTimerSec } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="new-todo-form" onKeyDown={(e) => this.eventEnter(e, todoTitle, todoTimerMin, todoTimerSec)}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.todoTitle}
          onChange={(e) => this.constrolledInput(e, 'todoTitle')}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.todoTimerMin}
          onChange={(e) => this.constrolledInput(e, 'todoTimerMin')}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.todoTimerSec}
          onChange={(e) => this.constrolledInput(e, 'todoTimerSec')}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  eventCreate: () => {},
};

NewTaskForm.propTypes = {
  eventCreate: PropTypes.func,
};
