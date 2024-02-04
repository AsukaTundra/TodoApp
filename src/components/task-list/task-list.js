import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

function TaskList({ todoData, filter, eventStatusEdit, eventDiscriptionEdit, eventDelete }) {
  // создаем отображаемые элементы
  const elements = todoData.map((item) => {
    const { id, className, discription, timeCreated, todoTimerMin, todoTimerSec } = item;
    return (
      <Task
        key={id}
        filter={filter}
        className={className}
        discription={discription}
        timeCreated={timeCreated}
        todoTimerMin={todoTimerMin}
        todoTimerSec={todoTimerSec}
        eventStatusEdit={() => eventStatusEdit(id)}
        eventDiscriptionEdit={(newDiscription) => eventDiscriptionEdit(id, newDiscription)}
        eventDelete={() => eventDelete(id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todoData: [],
  filter: 'All',
  eventStatusEdit: () => {},
  eventDiscriptionEdit: () => {},
  eventDelete: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.array,
  filter: PropTypes.string,
  eventStatusEdit: PropTypes.func,
  eventDiscriptionEdit: PropTypes.func,
  eventDelete: PropTypes.func,
};

export default TaskList;
