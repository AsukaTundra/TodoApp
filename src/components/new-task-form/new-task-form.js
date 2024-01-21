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
    return <input className="new-todo" placeholder="What needs to be done?" onKeyDown={this.eventEnter} />;
  }
}

NewTaskForm.defaultProps = {
  eventCreate: () => {},
};

NewTaskForm.propTypes = {
  eventCreate: PropTypes.func,
};
