import React, { useState } from 'react';

import './todo-app.css';
import TaskList from '../components/task-list';
import Footer from '../components/footer';
import NewTaskForm from '../components/new-task-form';

function TodoApp() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('All');

  const funcFindIndex = (id) => todoData.findIndex((item) => item.id === id);
  const funcNewArray = () => JSON.parse(JSON.stringify(todoData));

  const eventStatusEdit = (id) => {
    const index = funcFindIndex(id);
    const { className } = todoData[index];
    const newArray = funcNewArray();
    if (className === 'view') {
      newArray[index].className = 'completed';
    } else {
      newArray[index].className = 'view';
    }
    setTodoData(newArray);
  };

  const eventDiscriptionEdit = (id, newDiscription) => {
    const index = funcFindIndex(id);
    const newArray = funcNewArray();
    if (newArray[index].className !== 'completed') {
      if (typeof newDiscription === 'string') {
        newArray[index].className = 'view';
        newArray[index].discription = newDiscription;
        setTodoData(newArray);
      } else {
        newArray[index].className = 'editing';
        setTodoData(newArray);
      }
    }
  };

  const eventDelete = (id) => {
    const index = funcFindIndex(id);
    const firstPart = todoData.slice(0, index);
    const lastPart = todoData.slice(index + 1);
    setTodoData([...firstPart, ...lastPart]);
  };

  const eventCreate = (discription, todoTimerMin, todoTimerSec) => {
    const findFreeId = () => {
      const idList = [];
      let i = 1;
      for (let f = 0; f < todoData.length; f++) {
        idList.push(todoData[f].id);
      }
      while (idList.includes(i)) {
        i += 1;
      }
      return i;
    };

    if (discription.trim()) {
      const oldArray = funcNewArray();
      const newItem = {
        id: findFreeId(),
        className: 'view',
        discription,
        timeCreated: Date.now(),
        todoTimerMin,
        todoTimerSec,
      };
      setTodoData([newItem, ...oldArray]);
    }
  };

  const eventClearCompleted = (howItemLeft) => {
    setTodoData([...howItemLeft]);
  };

  const eventFilter = (valueFilter) => {
    setFilter(valueFilter);
  };

  const howItemLeft = todoData.filter((item) => item.className === 'view' || item.className === 'editing');

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm eventCreate={eventCreate} />
      </header>
      <section className="main">
        <TaskList
          todoData={todoData}
          filter={filter}
          eventStatusEdit={eventStatusEdit}
          eventDiscriptionEdit={eventDiscriptionEdit}
          eventDelete={eventDelete}
        />
        <Footer howItemLeft={howItemLeft} eventClearCompleted={eventClearCompleted} eventFilter={eventFilter} />
      </section>
    </section>
  );
}

export default TodoApp;
