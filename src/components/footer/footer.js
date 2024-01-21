import PropTypes from 'prop-types';

import './footer.css';
import TasksFilter from '../tasks-filter';

function Footer({ howItemLeft, onClickClearCompleted, onClickFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{howItemLeft.length} items left</span>
      <TasksFilter onClickFilter={onClickFilter} />
      <button type="button" className="clear-completed" onClick={() => onClickClearCompleted(howItemLeft)}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  howItemLeft: [],
  onClickClearCompleted: () => {},
  onClickFilter: () => {},
};

Footer.propTypes = {
  howItemLeft: PropTypes.arrayOf(PropTypes.object),
  onClickClearCompleted: PropTypes.func,
  onClickFilter: PropTypes.func,
};

export default Footer;
