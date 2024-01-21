import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

function TaskList({ todoData, filter, eventStatusEdit, eventDiscriptionEdit, eventDelete }) {
  // создаем отображаемые элементы
  let elements = todoData.map((item) => {
    const { id, className, discription, timeCreated } = item;
    return (
      <Task
        key={id}
        className={className}
        discription={discription}
        timeCreated={timeCreated}
        eventStatusEdit={() => eventStatusEdit(id)}
        eventDiscriptionEdit={(newDiscription) => eventDiscriptionEdit(id, newDiscription)}
        eventDelete={() => eventDelete(id)}
      />
    );
  });

  // применяем фильтр
  if (filter === 'Active') {
    elements = elements.filter((item) => item.props.className === 'view' || item.props.className === 'editing');
  } else if (filter === 'Completed') {
    elements = elements.filter((item) => item.props.className === 'completed' || item.props.className === 'editing');
  }

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  filter: 'All',
  eventStatusEdit: () => {},
  eventDiscriptionEdit: () => {},
  eventDelete: () => {},
};

TaskList.propTypes = {
  filter: PropTypes.string,
  eventStatusEdit: PropTypes.func,
  eventDiscriptionEdit: PropTypes.func,
  eventDelete: PropTypes.func,
};

export default TaskList;
