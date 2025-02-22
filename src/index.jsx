import * as React from 'react';
import ReactDOM from 'react-dom/client';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList.';
import Footer from './components/Footer';
import './index.css';

const arrayTasks = [
  { id: 1, description: 'Completed task', done: true, created: Date.now() },
  { id: 2, description: 'Editing task', done: false, created: Date.now() },
  { id: 3, description: 'Active task', done: false, created: Date.now() },
];

class AppTodo extends React.Component {
  state = {
    tasks: arrayTasks,
    allTasks: arrayTasks,
    activeFilter: 'All',
    editingTaskId: null, // ID редактируемой задачи
  };

  startEditing = (id) => {
    console.log('Начало редактирования:', id);
    this.setState({ editingTaskId: id });
  };

  stopEditing = () => {
    console.log('Остановка редактирования');
    this.setState({ editingTaskId: null });
  };

  addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      done: false,
      created: Date.now(),
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      allTasks: [...prevState.allTasks, newTask],
    }));
  };

  toggleTaskStatus = (id) => {
    const updatedTasks = this.state.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
    this.setState({ tasks: updatedTasks, allTasks: updatedTasks });
  };

  deleteTask = (id) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: updatedTasks, allTasks: updatedTasks });
  };

  clearCompleted = () => {
    const activeTasks = this.state.tasks.filter((task) => !task.done);
    this.setState({ tasks: activeTasks, allTasks: activeTasks });
  };

  onActive = () => {
    this.setState(() => ({
      tasks: this.state.allTasks.filter((task) => !task.done),
      activeFilter: 'Active',
    }));
  };

  onComplited = () => {
    this.setState(() => ({
      tasks: this.state.allTasks.filter((task) => task.done),
      activeFilter: 'Completed',
    }));
  };

  onAll = () => {
    this.setState({ tasks: this.state.allTasks, activeFilter: 'All' });
  };

  editTask = (id, newDescription) => {
    this.setState(
      (prevState) => {
        console.log('Редактируем задачу с ID:', id, 'Новый текст:', newDescription);

        const updatedAllTasks = prevState.allTasks.map((task) =>
          task.id === id ? { ...task, description: newDescription } : task
        );

        console.log('Обновленный список задач:', updatedAllTasks);

        return {
          tasks: updatedAllTasks, // Переприсваиваем заново, чтобы React перерисовал список
          allTasks: updatedAllTasks,
          editingTaskId: null, // Завершаем редактирование
        };
      },
      () => {
        console.log('Текущий список после обновления:', this.state.tasks);
      }
    );
  };

  render() {
    console.log('Рендер списка задач:', this.state.tasks);
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.state.tasks}
            onToggle={this.toggleTaskStatus}
            onDelete={this.deleteTask}
            onEdit={this.editTask}
            onStartEditing={this.startEditing}
            onStopEditing={this.stopEditing}
            editingTaskId={this.state.editingTaskId}
          />
        </section>
        <Footer
          onClearCompleted={this.clearCompleted}
          onActive={this.onActive}
          onComplited={this.onComplited}
          onAll={this.onAll}
          selected={this.state.activeFilter}
          activeCount={this.state.allTasks.filter((task) => !task.done).length}
        />
      </section>
    );
  }
}

export default AppTodo;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppTodo />);
