import { useState, useEffect } from 'react'
import './App.css'

/**
 * Task Manager App - Main Component
 * Manages application state, localStorage synchronization, and CRUD operations
 */
function App() {
  // ========== STATE MANAGEMENT ==========
  
  /**
   * Tasks state - array of task objects
   * Schema: { id: string, text: string, completed: boolean }
   * Initialized with lazy initializer to load from localStorage once on mount
   */
  const [tasks, setTasks] = useState(() => {
    return loadTasksFromStorage();
  });

  /**
   * Filter state - controls which tasks are visible
   * Values: 'all' | 'active' | 'completed'
   */
  const [filter, setFilter] = useState('all');

  // ========== LOCALSTORAGE SYNCHRONIZATION ==========
  
  /**
   * Load tasks from localStorage on startup
   * Validates data and handles errors gracefully
   */
  function loadTasksFromStorage() {
    try {
      const storedTasks = localStorage.getItem('tasks');
      
      if (!storedTasks) {
        return []; // No data, return empty array
      }

      const parsed = JSON.parse(storedTasks);
      
      // Validate that it's an array
      if (!Array.isArray(parsed)) {
        console.warn('Invalid tasks data in localStorage: not an array');
        return [];
      }

      // Validate each task has required properties
      const isValid = parsed.every(task => 
        task &&
        typeof task.id === 'string' &&
        typeof task.text === 'string' &&
        typeof task.completed === 'boolean'
      );

      if (!isValid) {
        console.warn('Invalid tasks data in localStorage: schema validation failed');
        return [];
      }

      return parsed;
    } catch (error) {
      console.warn('Failed to load tasks from localStorage:', error.message);
      return []; // Fall back to empty array
    }
  }

  /**
   * Save tasks to localStorage whenever tasks change
   * Uses useEffect to sync on every tasks update
   */
  useEffect(() => {
    try {
      const jsonString = JSON.stringify(tasks);
      localStorage.setItem('tasks', jsonString);
    } catch (error) {
      // Handle quota exceeded or other storage errors
      console.warn('Failed to save tasks to localStorage:', error.message);
      // Could show UI notification here if needed
    }
  }, [tasks]);

  // ========== DERIVED VALUES ==========
  
  /**
   * Calculate number of active (incomplete) tasks
   */
  const activeCount = tasks.filter(task => !task.completed).length;

  /**
   * Filter tasks based on current filter value
   */
  const visibleTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // ========== CRUD OPERATIONS ==========
  
  /**
   * Generate unique ID for new tasks
   * Uses crypto.randomUUID() if available, otherwise fallback
   */
  function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback: timestamp + random suffix
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Add a new task
   * @param {string} text - The task text
   */
  function addTask(text) {
    const newTask = {
      id: generateId(),
      text: text.trim(),
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  /**
   * Toggle task completion status
   * @param {string} id - The task ID
   */
  function toggleTask(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  /**
   * Edit task text
   * @param {string} id - The task ID
   * @param {string} newText - The new text
   */
  function editTask(id, newText) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  }

  /**
   * Delete a task
   * @param {string} id - The task ID
   */
  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  // ========== RENDER ==========
  
  return (
    <div className="app">
      <h1>Task Manager</h1>
      
      <div className="app-container">
        <p>State Management Implemented</p>
        <p>Tasks: {tasks.length}</p>
        <p>Active: {activeCount}</p>
        <p>Filter: {filter}</p>
        <p>Visible: {visibleTasks.length}</p>
        
        {/* Components will be integrated here */}
        {/* <TaskInput onAddTask={addTask} /> */}
        {/* <TaskFilters filter={filter} activeCount={activeCount} onSetFilter={setFilter} /> */}
        {/* <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} /> */}
      </div>
    </div>
  )
}

export default App
