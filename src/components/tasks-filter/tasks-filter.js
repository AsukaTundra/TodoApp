import React from 'react';

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

  // фокус фильтр кнопок
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
              this.props.onClickFilter('All');
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
              this.props.onClickFilter('Active');
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
              this.props.onClickFilter('Completed');
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
  onClickFilter: () => {},
};
