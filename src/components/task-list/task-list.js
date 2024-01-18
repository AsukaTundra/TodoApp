import Task from "../task/task";
import './task-list.css';

const TaskList = ({ todoData, filter, onClickStatusEdit, onClickDelete }) => {
  
  let elements = todoData.map((item) => {
    const { id, ...todos } = item;
    return <Task key={id} {...todos}
      onClickStatusEdit={() => onClickStatusEdit(id)}
      onClickDelete={() => onClickDelete(id)} />
  })
  
  if (filter === 'Active') {
    elements = elements.filter((item) => item.props.done === false)
  } else if (filter === 'Completed') {
    elements = elements.filter((item) => item.props.done === true)
  }

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TaskList;