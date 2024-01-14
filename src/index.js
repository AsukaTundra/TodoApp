import React from "react";
import ReactDOM from "react-dom/client";

import TodoApp from "./components/todo-app";

const taskParametres = [
  {id: 1, currentStatus: "completed", discription: "Completed task", timeCreated: new Date(2023, 11, 6)},
  {id: 2, currentStatus: "editing", discription: "Editing task", timeCreated: Date.now()},
  {id: 3, currentStatus: "view", discription: "Active task", timeCreated: new Date(2023, 4, 6)}
];

const root = ReactDOM.createRoot(document.querySelector('.container'))
root.render(<TodoApp todos={ taskParametres }/>)