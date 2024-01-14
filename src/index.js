import React from "react";
import ReactDOM from "react-dom/client";

import TodoApp from "./components/todo-app";

const taskParametres = [
  {id: 1, className: "completed", discription: "Completed task"},
  {id: 2, className: "editing", discription: "Editing task"},
  {id: 3, className: "view", discription: "Active task"}
];

const root = ReactDOM.createRoot(document.querySelector('body'))
root.render(<TodoApp todos={ taskParametres }/>)