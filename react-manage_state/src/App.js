import React, { useState, useEffect } from "react";
import "./index.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!taskName.trim() || !taskDesc.trim())
      return alert("Please fill in all fields");
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex
          ? { name: taskName, description: taskDesc, completed: task.completed }
          : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        { name: taskName, description: taskDesc, completed: false },
      ]);
    }
    setTaskName("");
    setTaskDesc("");
  };

  const handleDeleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleEditTask = (index) => {
    setTaskName(tasks[index].name);
    setTaskDesc(tasks[index].description);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-100 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        To-Do List
      </h1>
      <div className="mb-6">
        <input
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          placeholder="Task Description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`mb-4 p-4 border rounded shadow ${
            task.completed ? "bg-green-100" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onClick={() => toggleComplete(index)}
                className="mr-2"
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : "text-black"
                } font-medium`}
              >
                {task.name}
              </span>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditTask(index)}
                className="mr-2 bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
