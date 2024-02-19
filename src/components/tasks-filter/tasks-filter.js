import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

function TasksFilter({ eventFilter }) {
  const [filters, setFilters] = useState({ one: 'selected', two: null, three: null });

  const ApplyFilters = (id) => {
    const newState = { one: null, two: null, three: null };
    newState[id] = 'selected';
    setFilters(newState);
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filters.one}
          onClick={() => {
            eventFilter('All');
            ApplyFilters('one');
          }}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filters.two}
          onClick={() => {
            eventFilter('Active');
            ApplyFilters('two');
          }}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filters.three}
          onClick={() => {
            eventFilter('Completed');
            ApplyFilters('three');
          }}>
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TasksFilter;

TasksFilter.defaultProps = {
  eventFilter: () => {},
};

TasksFilter.propTypes = {
  eventFilter: PropTypes.func,
};

/*
import React from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TasksFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filtersData: [
        { filterId: 1, className: 'selected' },
        { filterId: 2, className: '' },
        { filterId: 3, className: '' },
      ],
    };
  }

  ApplyFilters = (id) => {
    const newState = Array.from(this.state.filtersData);
    newState.forEach((item) => {
      item.className = null;
    });
    newState[id - 1].className = 'selected';
    this.setState(() => {
      return {
        filtersData: [...newState],
      };
    });
  };

  render() {
    const [All, Active, Completed] = this.state.filtersData;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={All.className}
            onClick={() => {
              this.props.eventFilter('All');
              this.ApplyFilters(1);
            }}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={Active.className}
            onClick={() => {
              this.props.eventFilter('Active');
              this.ApplyFilters(2);
            }}>
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={Completed.className}
            onClick={() => {
              this.props.eventFilter('Completed');
              this.ApplyFilters(3);
            }}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  eventFilter: () => {},
};

TasksFilter.propTypes = {
  eventFilter: PropTypes.func,
};
*/
