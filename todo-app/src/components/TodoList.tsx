import React from 'react';
import { List, ListItem, ListItemText, Checkbox } from '@mui/material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <List>
      {todos.map(todo => (
        <ListItem
          key={todo.id}
          component="div"  
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <ListItemText primary={todo.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
