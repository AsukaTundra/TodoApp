import React from 'react';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  // нажатие Enter
  onClickEnter = (e) => {
    if (e.keyCode === 13) {
      this.props.onClickCreate(e.target.value);
      e.target.value = '';
    }
  };

  render() {
    return <input className="new-todo" placeholder="What needs to be done?" onKeyDown={this.onClickEnter} />;
  }
}
// autoFocus убрал
NewTaskForm.defaultProps = {
  onClickCreate: () => {},
};
