import Task from "../task/task";

const TaskList = ({ todos }) => {
  
  const elements = todos.map((item) => {
    const { id, ...itemNotId } = item;
    return <Task key={ id } item={ itemNotId }/>
  })

  return (
    <ul className="todo-list">
      { elements }
    </ul>
  );
};

export default TaskList;