import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Container, Typography, Button, Grid } from '@mui/material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Функция для добавления новой задачи
  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  // Функция для переключения состояния задачи (выполнено/не выполнено)
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Список дел
      </Typography>
      
      <TodoInput addTodo={addTodo} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />

      {/* Контейнер для кнопок с отступами */}
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" onClick={() => setFilter('all')}>
            Все
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" onClick={() => setFilter('active')}>
            Активные
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" onClick={() => setFilter('completed')}>
            Выполненные
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
