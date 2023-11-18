import React, { useState, useEffect } from "react";
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completeAll, setCompleteAll] = useState(false);
  const [theme] = useState("dark-theme");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = prompt("Modifica l'attività", tasks[index].text);
    setTasks(updatedTasks);
  };

  const completeAllTasks = () => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      completed: !completeAll,
    }));
    setTasks(updatedTasks);
    setCompleteAll(!completeAll);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const allCompleted = () => {
    return tasks.every((task) => task.completed);
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-lg-9 col-xl-7">
          <div className="card-body p-4">
            <h1 className="text-center my-3 pb-3 title-text">ToDo List</h1>
            <input
              className="form-control mb-4 pb-2"
              type="text"
              name="new-task"
              placeholder="Aggiungi la tua nuova attività"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <div id="btn-primary">
              <button className="btn btn-primary" onClick={addTask}>
                Aggiungi
              </button>
            </div>
            {tasks.length >= 2 && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-success"
                  onClick={completeAllTasks}>
                  {allCompleted() ? "Riavvia Tutto" : "Completa Tutto"}
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={removeAllTasks}>
                  Elimina Tutto
                </button>
              </div>
            )}
            <div id="new-list" className="">
              <ul id="list-task">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`task-item text-center list-unstyled  ${
                      task.completed ? "completed" : ""
                    }m-5`}
                    style={{ backgroundColor: getRandomColor() }}>
                    <span className="task-text">{task.text}</span>
                    <hr />
                    <button
                      className="complete-btn btn btn-success"
                      onClick={() => completeTask(index)}>
                      {task.completed ? "Ricomincia" : "Completata"}
                    </button>
                    <button
                      className="delete-btn btn btn-danger"
                      onClick={() => deleteTask(index)}>
                      Elimina
                    </button>
                    <button
                      className="edit-btn btn btn-warning"
                      onClick={() => editTask(index)}>
                      Modifica
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
