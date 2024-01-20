import React from "react"

import './todo-app.css'
import TaskList from "./task-list"
import Footer from "./footer"
import NewTaskForm from "./new-task-form"

export default class TodoApp extends React.Component {

  state = {
    todoData: [],
    filter: 'All'
  }

  // две внутренние функции
  funcFindIndex = (id) => {
    return this.state.todoData.findIndex((item) => item.id === id)
  }

  funcCloneStateData = () => {
    return JSON.parse(JSON.stringify(this.state.todoData))
  }

  // изменение статуса
  statusEdit = (id) => {
    const index = this.funcFindIndex(id)
    const className = this.state.todoData[index].className
    const newArray = this.funcCloneStateData()
    className === 'view' ? newArray[index].className = 'completed' : newArray[index].className = 'view'
    this.setState(() => {
      return {
        todoData: newArray
      }
    })
  }

  // редактирование
  discriptionEdit = (id, newDiscription) => {
    const index = this.funcFindIndex(id)
    const newArray = this.funcCloneStateData()
    if (newArray[index].className !== 'completed') {
      if (typeof newDiscription === 'string') {
        newArray[index].className = 'view'
        newArray[index].discription = newDiscription
        this.setState(() => {
          return {
            todoData: newArray
          }
        })
      } else {
        newArray[index].className = 'editing'
        this.setState(() => {
          return {
            todoData: newArray
          }
        })
      }
    }
  }

  // удаление
  delete = (id) => {
    const index = this.funcFindIndex(id)
    const firstPart = this.state.todoData.slice(0, index)
    const lastPart = this.state.todoData.slice(index + 1)
    this.setState(() => {
      return {
        todoData: [...firstPart, ...lastPart]
      }
    })
  }

  // создание
  create = (discription) => {
    // поиск свободного id
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

    const oldArray = this.funcCloneStateData()
    const newItem = { id: findFreeId(), className: 'view', discription: discription, timeCreated: Date.now() }
    this.setState(() => {
      return {
        todoData: [newItem, ...oldArray]
      }
    })
  }

  // удаление выполненных
  clearCompleted = (howItemLeft) => {
    this.setState(() => {
      return {
        todoData: [...howItemLeft]
      }
    })
  }

  // фильтр
  filter = (valueFilter) => {
    this.setState(() => {
      return {
        filter: valueFilter
      }
    })
  }

  render() {
    // n? items left
    const howItemLeft = this.state.todoData.filter((item) => item.className === 'view' || item.className === 'editing')

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            onClickCreate={this.create} />
        </header>
        <section className="main">
          <TaskList
            todoData={this.state.todoData}
            filter={this.state.filter}
            onClickStatusEdit={this.statusEdit}
            onClickDiscriptionEdit={this.discriptionEdit}
            onClickDelete={this.delete} />
          <Footer
            howItemLeft={howItemLeft}
            onClickClearCompleted={this.clearCompleted}
            onClickFilter={this.filter} />
        </section>
      </section>
    )
  }
}