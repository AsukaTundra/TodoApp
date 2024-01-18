import React from "react";
import TaskList from "./task-list";
import Footer from "./footer";
import NewTaskForm from "./new-task-form";
import './todo-app.css';

export default class TodoApp extends React.Component {

  state = {
    todoData: [],
    filter: 'All'
  }

  onClickStatusEdit = (id) => {
    this.setState(() => {
      const itemIndex = this.state.todoData.findIndex((item) => item.id === id)
      const itemDone = this.state.todoData[itemIndex].done
      const newArray = Array.from(this.state.todoData)
      newArray[itemIndex].done = !itemDone
      return {
        todoData: newArray
      }
    })
  }

  onClickDelete = (id) => {
    this.setState(() => {
      const itemIndex = this.state.todoData.findIndex((item) => item.id === id)
      const firstPart = this.state.todoData.slice(0, itemIndex)
      const lastPart = this.state.todoData.slice(itemIndex + 1)
      return {
        todoData: [...firstPart, ...lastPart]
      }
    })
  }

  onClickCreate = (discription) => {
    const findFreeId = () => {
      let idList = []
      for (let i = 0; i < this.state.todoData.length; i++) {
        idList.push(this.state.todoData[i].id)
      }
      let i = 1
      while (idList.includes(i)) {
        i++
      }
      return i
    }

    this.setState(() => {
      const oldArray = Array.from(this.state.todoData)
      const newItem = { id: findFreeId(), done: false, discription: discription, timeCreated: Date.now() }
      return {
        todoData: [newItem, ...oldArray]
      }
    })
  }

  onClickClearCompleted = (howItemLeft) => {
    this.setState(() => {
      return {
        todoData: [...howItemLeft]
      }
    })
  }

  onClickFilterAll = () => {
    this.setState(() => {
      return {
        filter: 'All'
      }
    })
  }

  onClickFilterActive = () => {
    this.setState(() => {
      return {
        filter: 'Active'
      }
    })
  }

  onClickFilterCompleted = () => {
    this.setState(() => {
      return {
        filter: 'Completed'
      }
    })
  }

  render() {
    const howItemLeft = this.state.todoData.filter((item) => item.done === false)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onClickCreate={this.onClickCreate} />
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