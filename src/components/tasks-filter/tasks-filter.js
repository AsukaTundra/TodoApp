import React from 'react';
import './tasks-filter.css';

export default class TasksFilter extends React.Component {
  state = {
    filtersData: [
      { filterId: 1, className: 'selected' },
      { filterId: 2, className: null },
      { filterId: 3, className: null }
    ]
  }

  ApplyFilters = (id) => {
    const newState = Array.from(this.state.filtersData)
    newState.forEach((item) => {
      item.className = null
    })
    newState[id - 1].className = 'selected'
    this.setState(() => {
      return {
        filtersData: [...newState]
      }
    })
  }

  render() {
    const [All, Active, Completed] = this.state.filtersData
    return (
      <ul className="filters">
        <li>
          <button className={All.className} onClick={() => {
            this.props.onClickFilterAll()
            this.ApplyFilters(1)
          }}>All</button>
        </li>
        <li>
          <button className={Active.className} onClick={() => {
            this.props.onClickFilterActive()
            this.ApplyFilters(2)
          }}>Active</button>
        </li>
        <li>
          <button className={Completed.className} onClick={() => {
            this.props.onClickFilterCompleted()
            this.ApplyFilters(3)
          }}>Completed</button>
        </li>
      </ul>
    );
  }
}