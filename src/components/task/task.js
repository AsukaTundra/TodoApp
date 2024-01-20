import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import './task.css'

export default class Task extends React.Component {

  render() {
    const { className, discription, timeCreated, onClickStatusEdit, onClickDiscriptionEdit, onClickDelete } = this.props
    const time = formatDistanceToNow(timeCreated, { addSuffix: true })

    // enter вызывает функцию с новым значением
    const onClickEnter = (e) => {
      if (e.keyCode === 13) {
        onClickDiscriptionEdit(e.target.value)
      }
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={(className === 'view') ? '' : 'true'} onClick={onClickStatusEdit} />
          <label>
            <span className="description" >{discription}</span>
            <span className="created">{time}</span>
          </label>
          <button className="icon icon-edit" onClick={onClickDiscriptionEdit}></button>
          <button className="icon icon-destroy" onClick={onClickDelete}></button>
        </div>
        <input type="text" className="edit" defaultValue={discription} onKeyDown={onClickEnter} />
      </li>
    )
  }

  static defaultProps = {
    className: 'view',
    discription: '',
    timeCreated: Date.now(),
    onClickStatusEdit: () => { },
    onClickDiscriptionEdit: () => { },
    onClickDelete: () => { }
  }
}