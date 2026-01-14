import TaskItem from './TaskItem';
import './TaskList.css';

/**
 * TaskList Component
 * Renders a list of tasks according to the current filter
 * 
 * Props:
 * - tasks: Task[] - Array of filtered tasks to display
 * - onToggle: (id: string) => void - Callback to toggle task completion
 * - onDelete: (id: string) => void - Callback to delete a task
 * - onEdit: (id: string, newText: string) => void - Callback to edit task text
 */
function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    // Display fallback message when list is empty
    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <p>No tasks to display. Add a new task to get started!</p>
            </div>
        );
    }

    // Map tasks to TaskItem components
    return (
        <ul className="task-list" role="list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default TaskList;
