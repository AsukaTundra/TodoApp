import PropTypes from 'prop-types'

import './footer.css'
import TasksFilter from '../tasks-filter'

const Footer = ({ howItemLeft, onClickClearCompleted, onClickFilter }) => {

  return (
    <footer className="footer">
      <span className="todo-count">{howItemLeft.length} items left</span>
      <TasksFilter
        onClickFilter={onClickFilter} />
      <button className="clear-completed" onClick={() => onClickClearCompleted(howItemLeft)}>Clear completed</button>
    </footer>
  )
}

Footer.defaultProps = {
  onClickClearCompleted: () => {},
  onClickFilter: () => {}
}

Footer.propTypes = {
  howItemLeft: PropTypes.array
}

export default Footer