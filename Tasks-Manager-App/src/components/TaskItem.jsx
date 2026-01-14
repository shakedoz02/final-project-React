import { useState } from 'react';
import './TaskItem.css';

/**
 * TaskItem Component
 * Represents a single task with toggle, edit, and delete functionality
 * 
 * Props:
 * - task: Task - The task object { id, text, completed }
 * - onToggle: (id: string) => void - Callback to toggle completion
 * - onDelete: (id: string) => void - Callback to delete task
 * - onEdit: (id: string, newText: string) => void - Callback to edit task text
 */
function TaskItem({ task, onToggle, onDelete, onEdit }) {
    // Local state for edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.text);

    /**
     * Handle toggle completion
     */
    function handleToggle() {
        onToggle(task.id);
    }

    /**
     * Handle delete
     */
    function handleDelete() {
        onDelete(task.id);
    }

    /**
     * Enter edit mode
     */
    function handleEditStart() {
        setIsEditing(true);
        setEditValue(task.text);
    }

    /**
     * Save edited text
     */
    function handleEditSave() {
        const trimmedValue = editValue.trim();

        // Don't save if empty
        if (!trimmedValue) {
            return;
        }

        // Only save if changed
        if (trimmedValue !== task.text) {
            onEdit(task.id, trimmedValue);
        }

        setIsEditing(false);
    }

    /**
     * Cancel edit
     */
    function handleEditCancel() {
        setIsEditing(false);
        setEditValue(task.text);
    }

    /**
     * Handle key press in edit mode
     */
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    }

    // Render edit mode
    if (isEditing) {
        return (
            <li className="task-item task-item-editing">
                <input
                    type="text"
                    className="task-item-edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    aria-label="Edit task"
                />
                <div className="task-item-actions">
                    <button
                        onClick={handleEditSave}
                        className="task-item-btn task-item-btn-save"
                        aria-label="Save changes"
                        title="Save"
                    >
                        ✓
                    </button>
                    <button
                        onClick={handleEditCancel}
                        className="task-item-btn task-item-btn-cancel"
                        aria-label="Cancel editing"
                        title="Cancel"
                    >
                        ✕
                    </button>
                </div>
            </li>
        );
    }

    // Render view mode
    return (
        <li className={`task-item ${task.completed ? 'task-item-completed' : ''}`}>
            <div className="task-item-content">
                <input
                    type="checkbox"
                    className="task-item-checkbox"
                    checked={task.completed}
                    onChange={handleToggle}
                    aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <span
                    className="task-item-text"
                    onDoubleClick={handleEditStart}
                    title="Double-click to edit"
                >
                    {task.text}
                </span>
            </div>
            <div className="task-item-actions">
                <button
                    onClick={handleEditStart}
                    className="task-item-btn task-item-btn-edit"
                    aria-label={`Edit "${task.text}"`}
                    title="Edit"
                >
                    ✎
                </button>
                <button
                    onClick={handleDelete}
                    className="task-item-btn task-item-btn-delete"
                    aria-label={`Delete "${task.text}"`}
                    title="Delete"
                >
                    🗑
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
