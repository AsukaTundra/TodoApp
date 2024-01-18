import React from "react"

import TaskList from "./task-list"
import Footer from "./footer"
import NewTaskForm from "./new-task-form"

import './todo-app.css'

export default class TodoApp extends React.Component {

  state = {
    todoData: [],
    filter: 'All'
  }

  // изменение статуса
  onClickStatusEdit = (id) => {
    const index = this.state.todoData.findIndex((item) => item.id === id)
    const done = this.state.todoData[index].done
    const newArray = Array.from(this.state.todoData)
    newArray[index].done = !done
    this.setState(() => {
      return {
        todoData: newArray
      }
    })
  }

  // удаление
  onClickDelete = (id) => {
    const index = this.state.todoData.findIndex((item) => item.id === id)
    const firstPart = this.state.todoData.slice(0, index)
    const lastPart = this.state.todoData.slice(index + 1)
    this.setState(() => {
      return {
        todoData: [...firstPart, ...lastPart]
      }
    })
  }

  // создание
  onClickCreate = (discription) => {
    // генерация свободного id
    const findFreeId = () => {
      let idList = []
      let i = 1
      for (let i = 0; i < this.state.todoData.length; i++) {
        idList.push(this.state.todoData[i].id)
      }
      while (idList.includes(i)) {
        i++
      }
      return i
    }

    const oldArray = Array.from(this.state.todoData)
    const newItem = { id: findFreeId(), done: false, discription: discription, timeCreated: Date.now() }
    this.setState(() => {
      return {
        todoData: [newItem, ...oldArray]
      }
    })
  }

  // удаление выполненных
  onClickClearCompleted = (howItemLeft) => {
    this.setState(() => {
      return {
        todoData: [...howItemLeft]
      }
    })
  }

  // фильтр All
  onClickFilterAll = () => {
    this.setState(() => {
      return {
        filter: 'All'
      }
    })
  }

  // фильтр Active
  onClickFilterActive = () => {
    this.setState(() => {
      return {
        filter: 'Active'
      }
    })
  }

  // фильтр Completed
  onClickFilterCompleted = () => {
    this.setState(() => {
      return {
        filter: 'Completed'
      }
    })
  }

  render() {
    // n* item completed
    const howItemLeft = this.state.todoData.filter((item) => item.done === false)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm 
          onClickCreate={this.onClickCreate} />
        </header>
        <section className="main">
          <TaskList
            todoData={this.state.todoData}
            filter={this.state.filter}
            onClickStatusEdit={this.onClickStatusEdit}
            onClickDelete={this.onClickDelete} />
          <Footer
            howItemLeft={howItemLeft}
            onClickClearCompleted={this.onClickClearCompleted}
            onClickFilterAll={this.onClickFilterAll}
            onClickFilterActive={this.onClickFilterActive}
            onClickFilterCompleted={this.onClickFilterCompleted} />
        </section>
      </section>
    )
  }
}