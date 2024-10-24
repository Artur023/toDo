import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Container, Typography, Button, Grid } from '@mui/material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
export const NameToDo: string = 'Список дел'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getButtonStyle = (currentFilter: 'all' | 'active' | 'completed') => ({
    backgroundColor: filter === currentFilter ? '#3f51b5' : '#e0e0e0',
    color: filter === currentFilter ? '#fff' : '#000',
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        {NameToDo}
      </Typography>

      <TodoInput addTodo={addTodo} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />

      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFilter('all')}
            style={getButtonStyle('all')}
          >
            Все
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFilter('active')}
            style={getButtonStyle('active')}
          >
            Активные
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFilter('completed')}
            style={getButtonStyle('completed')}
          >
            Выполненные
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
