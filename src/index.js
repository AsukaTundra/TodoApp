import React from "react";
import ReactDOM from "react-dom/client";

import './index.css';

import TodoApp from "./components/todo-app";

const root = ReactDOM.createRoot(document.querySelector('.container'))
root.render(<TodoApp />)