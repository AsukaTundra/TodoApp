import TasksFilter from '../tasks-filter'

import './footer.css'

const Footer = ({ howItemLeft, onClickClearCompleted, onClickFilterAll, onClickFilterActive, onClickFilterCompleted }) => {

  return (
    <footer className="footer">
      <span className="todo-count">{howItemLeft.length} items left</span>
      <TasksFilter
      onClickFilterAll={onClickFilterAll}
      onClickFilterActive={onClickFilterActive}
      onClickFilterCompleted={onClickFilterCompleted} />
      <button className="clear-completed" onClick={() => onClickClearCompleted(howItemLeft)}>Clear completed</button>
    </footer>
  )
}

export default Footer