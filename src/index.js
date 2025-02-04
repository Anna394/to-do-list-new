import React, { Component } from "react";
import ReactDOM from "react-dom/client";

import NewTaskForm from "./components/NewTaskForm.js";
import TaskList from "./components/TaskList.js";
import Footer from "./components/Footer";
import "./index.css";

const arrayTasks = [
  { id: 1, description: "Completed task", done: true, created: Date.now() },
  { id: 2, description: "Editing task", done: false, created: Date.now() },
  { id: 3, description: "Active task", done: false, created: Date.now() }
]

class AppTodo extends Component {

  state = {
    tasks: arrayTasks,
    allTasks: arrayTasks,
    activeFilter: "All",
  };

  addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      done: false,
      created: Date.now()
    };
    this.setState({ tasks: [...this.state.tasks, newTask],
                  allTasks: [...this.state.allTasks, newTask]});
  };

  toggleTaskStatus = (id) => {
    const updatedTasks = this.state.tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    this.setState({ tasks: updatedTasks, allTasks: updatedTasks});
  };

  deleteTask = (id) => {
    const updatedTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({ tasks: updatedTasks, allTasks: updatedTasks});
  };

  clearCompleted = () => {
    const activeTasks = this.state.tasks.filter(task => !task.done);
    this.setState({ tasks: activeTasks, allTasks: activeTasks});
  };

  onActive = () => {
    this.setState(() => ({
      tasks: this.state.allTasks.filter(task => !task.done),
      activeFilter: "Active"
    }));
  };
  

  onComplited = () => {
    this.setState(() => ({
      tasks: this.state.allTasks.filter(task => task.done),
      activeFilter: "Completed"
    }));
  };

  onAll = () => {
    this.setState({tasks:this.state.allTasks,
      activeFilter: "All"
    })
  }



  render() {
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
          />
        </section>
        <Footer
          onClearCompleted={this.clearCompleted}
          onActive={this.onActive}
          onComplited={this.onComplited}
          onAll={this.onAll}
          selected= {this.state.activeFilter}
          activeCount = {this.state.allTasks.filter(task => !task.done).length}
        />
      </section>
    );
  }
}

export default AppTodo;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppTodo />);

