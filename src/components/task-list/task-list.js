import PropTypes from 'prop-types'

import './task-list.css'
import Task from "../task/task"

const TaskList = ({ todoData, filter, onClickStatusEdit, onClickDiscriptionEdit, onClickDelete }) => {
  
  // создаем отображаемые элементы
  let elements = todoData.map((item) => {
    const { id, ...todos } = item;
    return <Task key={id} {...todos}
      onClickStatusEdit={() => onClickStatusEdit(id)}
      onClickDiscriptionEdit={(newDiscription) => onClickDiscriptionEdit(id, newDiscription)}
      onClickDelete={() => onClickDelete(id)} />
  })
  
  // применяем фильтр
  if (filter === 'Active') {
    elements = elements.filter((item) => item.props.className === 'view' || item.props.className === 'editing')
  } else if (filter === 'Completed') {
    elements = elements.filter((item) => item.props.className === 'completed' || item.props.className === 'editing')
  }

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )
}

TaskList.defaultProps = {
  filter: 'All',
  onClickStatusEdit: () => {},
  onClickDiscriptionEdit: () => {},
  onClickDelete: () => {}
}

TaskList.propTypes = {
  todoData: PropTypes.array
}

export default TaskList