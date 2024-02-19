import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm({ eventCreate }) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoTimerMin, setTodoTimerMin] = useState('');
  const [todoTimerSec, setTodoTimerSec] = useState('');

  const eventEnter = (e) => {
    if (e.keyCode === 13) {
      if (
        todoTitle &&
        (Number(todoTimerMin) || Number(todoTimerSec)) &&
        todoTimerMin.length <= 3 &&
        todoTimerSec.length <= 3
      ) {
        eventCreate(todoTitle, Number(todoTimerMin) + Math.floor(todoTimerSec / 60), todoTimerSec % 60);
        setTodoTitle('');
        setTodoTimerMin('');
        setTodoTimerSec('');
      } else {
        // eslint-disable-next-line no-alert
        alert('Invalid task data');
      }
    }
  };

  const constrolledInput = (e, element) => {
    if (element === 'todoTitle') {
      setTodoTitle(e.target.value);
    } else if (element === 'todoTimerMin') {
      setTodoTimerMin(e.target.value);
    } else if (element === 'todoTimerSec') {
      setTodoTimerSec(e.target.value);
    }
  };

  // const { todoTitle, todoTimerMin, todoTimerSec } = this.state;
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form className="new-todo-form" onKeyDown={(e) => eventEnter(e, todoTitle, todoTimerMin, todoTimerSec)}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={(e) => constrolledInput(e, 'todoTitle')}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={todoTimerMin}
        onChange={(e) => constrolledInput(e, 'todoTimerMin')}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={todoTimerSec}
        onChange={(e) => constrolledInput(e, 'todoTimerSec')}
      />
    </form>
  );
}

NewTaskForm.defaultProps = {
  eventCreate: () => {},
};

NewTaskForm.propTypes = {
  eventCreate: PropTypes.func,
};
