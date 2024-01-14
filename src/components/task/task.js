const Task = ({ item }) => {
  return (
    <li key={ item.id } className={ item.className }>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{ item.discription }</span>
          <span className="created">created 5 minutes ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      <input type="text" className="edit" value="Editing task" />
    </li>
  );
};

export default Task;