import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import React from 'react'

import './task.css'

export default class Task extends React.Component {

  render() {
    const { done, discription, timeCreated, onClickStatusEdit, onClickDelete } = this.props
    const time = formatDistanceToNow(timeCreated, { addSuffix: true })

    return (
      <li className={done ? "completed" : "view"}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={done ? "true" : ""} onClick={onClickStatusEdit} />
          <label>
            <span className="description" >{discription}</span>
            <span className="created">{time}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onClickDelete}></button>
        </div>
        <input type="text" className="edit" />
      </li>
    )
  }
}