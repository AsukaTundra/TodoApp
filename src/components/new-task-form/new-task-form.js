import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  // нажатие Enter
  eventEnter = (e) => {
    if (e.keyCode === 13) {
      this.props.eventCreate(e.target.value);
      e.target.value = '';
    }
  };

  render() {
    return (
      <form className="new-todo-form">
        <input className="new-todo" placeholder="What needs to be done?" onKeyDown={this.eventEnter} />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
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
