import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Task = ({ item }) => {
  const time = formatDistanceToNow(item.timeCreated , { addSuffix: true })
  return (
    <li className={ item.currentStatus }>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{ item.discription }</span>
          <span className="created">{ time }</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      <input type="text" className="edit" value="Editing task" /> {/* вызывает ошибку */}
    </li>
  );
};

export default Task;