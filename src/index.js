import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import TodoApp from './app/todo-app';

const root = ReactDOM.createRoot(document.querySelector('.container'));
root.render(<TodoApp />);
