import React from 'react';

import './todo-app.css';
import TaskList from './task-list';
import Footer from './footer';
import NewTaskForm from './new-task-form';

export default class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      todoData: [],
      filter: 'All',
    };
  }

  // две внутренние функции
  funcFindIndex = (id) => {
    return this.state.todoData.findIndex((item) => item.id === id);
  };

  funcCloneStateData = () => {
    return JSON.parse(JSON.stringify(this.state.todoData));
  };

  // изменение статуса
  eventStatusEdit = (id) => {
    const index = this.funcFindIndex(id);
    const { className } = this.state.todoData[index];
    const newArray = this.funcCloneStateData();
    // eslint-disable-next-line no-unused-expressions
    className === 'view' ? (newArray[index].className = 'completed') : (newArray[index].className = 'view');
    this.setState(() => {
      return {
        todoData: newArray,
      };
    });
  };

  // редактирование
  eventDiscriptionEdit = (id, newDiscription) => {
    const index = this.funcFindIndex(id);
    const newArray = this.funcCloneStateData();
    if (newArray[index].className !== 'completed') {
      if (typeof newDiscription === 'string') {
        newArray[index].className = 'view';
        newArray[index].discription = newDiscription;
        this.setState(() => {
          return {
            todoData: newArray,
          };
        });
      } else {
        newArray[index].className = 'editing';
        this.setState(() => {
          return {
            todoData: newArray,
          };
        });
      }
    }
  };

  // удаление
  eventDelete = (id) => {
    const index = this.funcFindIndex(id);
    const firstPart = this.state.todoData.slice(0, index);
    const lastPart = this.state.todoData.slice(index + 1);
    this.setState(() => {
      return {
        todoData: [...firstPart, ...lastPart],
      };
    });
  };

  // создание
  eventCreate = (discription, todoTimerMin, todoTimerSec) => {
    // поиск свободного id
    const findFreeId = () => {
      const idList = [];
      let i = 1;
      for (let f = 0; f < this.state.todoData.length; f++) {
        idList.push(this.state.todoData[f].id);
      }
      while (idList.includes(i)) {
        i += 1;
      }
      return i;
    };
    if (discription.trim()) {
      const oldArray = this.funcCloneStateData();
      const newItem = {
        id: findFreeId(),
        className: 'view',
        discription,
        timeCreated: Date.now(),
        todoTimerMin,
        todoTimerSec,
      };
      this.setState(() => {
        return {
          todoData: [newItem, ...oldArray],
        };
      });
    }
  };

  // удаление выполненных
  eventClearCompleted = (howItemLeft) => {
    this.setState(() => {
      return {
        todoData: [...howItemLeft],
      };
    });
  };

  // фильтр
  eventFilter = (valueFilter) => {
    this.setState(() => {
      return {
        filter: valueFilter,
      };
    });
  };

  render() {
    // n items left
    const howItemLeft = this.state.todoData.filter((item) => item.className === 'view' || item.className === 'editing');
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm eventCreate={this.eventCreate} />
        </header>
        <section className="main">
          <TaskList
            todoData={this.state.todoData}
            filter={this.state.filter}
            eventStatusEdit={this.eventStatusEdit}
            eventDiscriptionEdit={this.eventDiscriptionEdit}
            eventDelete={this.eventDelete}
          />
          <Footer
            howItemLeft={howItemLeft}
            eventClearCompleted={this.eventClearCompleted}
            eventFilter={this.eventFilter}
          />
        </section>
      </section>
    );
  }
}
