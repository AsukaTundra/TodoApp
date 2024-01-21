import PropTypes from 'prop-types';

import './footer.css';
import TasksFilter from '../tasks-filter';

function Footer({ howItemLeft, eventClearCompleted, eventFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{howItemLeft.length} items left</span>
      <TasksFilter eventFilter={eventFilter} />
      <button type="button" className="clear-completed" onClick={() => eventClearCompleted(howItemLeft)}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  howItemLeft: [],
  eventClearCompleted: () => {},
  eventFilter: () => {},
};

Footer.propTypes = {
  howItemLeft: PropTypes.arrayOf(PropTypes.object),
  eventClearCompleted: PropTypes.func,
  eventFilter: PropTypes.func,
};

export default Footer;
