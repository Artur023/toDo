import { render, screen, fireEvent } from '@testing-library/react';
import { NameToDo } from './App';
import App  from './App';

describe('Todo App', () => {
  test('renders the app correctly', () => {
    render(<App />);
    expect(screen.getByText(new RegExp(NameToDo, 'i'))).toBeInTheDocument();
  });

  test('can add a new todo', () => {
    render(<App />);

    const input = screen.getByLabelText(/Что нужно сделать?/i);
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.submit(input);

    expect(screen.getByText(/Новая задача/i)).toBeInTheDocument();
  });
  
  test('can filter todos by active and completed', () => {
    render(<App />);

    const input = screen.getByLabelText(/Что нужно сделать?/i);
    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.submit(input);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox); // Помечаем задачу как выполненную

    const activeButton = screen.getByRole('button', { name: /Активные/i });
    fireEvent.click(activeButton);

    expect(screen.queryByText(/Активная задача/i)).toBeNull();

    const completedButton = screen.getByRole('button', { name: /Выполненные/i });
    fireEvent.click(completedButton);

    expect(screen.getByText(/Активная задача/i)).toBeInTheDocument();
  });

  test('can switch between different filters', () => {
    render(<App />);

    // Добавим несколько задач
    const input = screen.getByLabelText(/Что нужно сделать?/i);
    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.submit(input);

    fireEvent.change(input, { target: { value: 'Выполненная задача' } });
    fireEvent.submit(input);

    // Сделаем вторую задачу выполненной
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    // Проверим фильтр "Активные"
    const activeButton = screen.getByRole('button', { name: /Активные/i });
    fireEvent.click(activeButton);
    expect(screen.getByText(/Активная задача/i)).toBeInTheDocument();
    expect(screen.queryByText(/Выполненная задача/i)).toBeNull();

    // Проверим фильтр "Выполненные"
    const completedButton = screen.getByRole('button', { name: /Выполненные/i });
    fireEvent.click(completedButton);
    expect(screen.getByText(/Выполненная задача/i)).toBeInTheDocument();
    expect(screen.queryByText(/Активная задача/i)).toBeNull();

    // Проверим фильтр "Все"
    const allButton = screen.getByRole('button', { name: /Все/i });
    fireEvent.click(allButton);
    expect(screen.getByText(/Активная задача/i)).toBeInTheDocument();
    expect(screen.getByText(/Выполненная задача/i)).toBeInTheDocument();
  });
});
