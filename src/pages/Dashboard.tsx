import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { taskService } from "../api/services/task.services";
import { type Task } from "../types/Task";
import "../styles/dashboard.css";
import {
  FiCheckSquare,
  FiSquare,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiX,
  FiInbox,
  FiList,
  FiCrosshair,
} from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const { logout } = useAuth();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  const fetchAllTasks = () => {
    taskService.getAllTasks().then(setTaskList);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    taskService
      .createTask({ title, description, status: "TODO" })
      .then(fetchAllTasks);
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
  };

  const enterEditMode = (task: Task) => {
    setEditMode(true);
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      created_at: task.created_at,
      done: task.done,
    });
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTask) {
      taskService.editTask(editTask).then(fetchAllTasks);
      setEditMode(false);
      setEditTask(null);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    taskService.deleteTask(taskId).then(fetchAllTasks);
  };

  const handleToggleDone = (taskId: number) => {
    taskService.toggleDone(taskId).then(fetchAllTasks);
  }

  const closeEditModal = () => {
    setEditMode(false);
    setEditTask(null);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <FiCheckSquare />
          </div>
          <h1>Task Manager</h1>
        </div>
        <button type="button" onClick={handleLogout} className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </header>

      <main className="dashboard-content">
        {/* Create Task Card */}
        <div className="create-task-card">
          <div className="create-task-header">
            <FiPlus />
            <h2>Add New Task</h2>
          </div>
          <form onSubmit={handleCreateTask} className="create-task-form">
            <div className="form-group">
              <label htmlFor="task-title">Title</label>
              <input
                id="task-title"
                type="text"
                ref={titleRef}
                placeholder="What needs to be done?"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-description">Description</label>
              <input
                id="task-description"
                type="text"
                ref={descriptionRef}
                placeholder="Add details (optional)"
              />
            </div>
            <button type="submit" className="create-btn">
              <FiPlus />
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks Section */}
        <section className="tasks-section">
          <div className="tasks-header">
            <FiList />
            <h2>Your Tasks</h2>
            {taskList.length > 0 && (
              <span className="task-count">{taskList.length}</span>
            )}
          </div>

          {taskList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FiInbox />
              </div>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started</p>
            </div>
          ) : (
            <div className="task-list">
              {taskList.map((task, index) => (
                <div
                  key={task.id || index}
                  className={`task-item ${task.done ? "task-done" : ""}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    type="button"
                    className={`task-checkbox ${task.done ? "checked" : ""}`}
                    onClick={() => handleToggleDone(task.id)}
                    title={task.done ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.done ? <RxCross2 size={30} /> : <FiCheckSquare size={30} />}
                  </button>
                  <div className="task-content">
                    <div className="task-title">{task.title}</div>
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                  </div>
                  <div className="task-actions">
                    <button
                      type="button"
                      className="task-action-btn"
                      onClick={() => enterEditMode(task)}
                      title="Edit task"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      className="task-action-btn delete"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete task"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Edit Modal */}
      {editMode && editTask && (
        <div className="edit-modal-overlay" onClick={closeEditModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>
                <FiEdit2 />
                Edit Task
              </h3>
              <button
                type="button"
                className="close-modal-btn"
                onClick={closeEditModal}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditTask} className="edit-form">
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask((prev: Task | null) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  placeholder="Task title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <input
                  id="edit-description"
                  type="text"
                  value={editTask.description}
                  onChange={(e) =>
                    setEditTask((prev: Task | null) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Task description"
                />
              </div>
              <div className="edit-form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
