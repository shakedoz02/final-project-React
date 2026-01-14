import { useState } from 'react';
import './TaskInput.css';

/**
 * TaskInput Component
 * Controlled form for adding new tasks
 * 
 * Props:
 * - onAddTask: (text: string) => void - Callback to add a new task
 */
function TaskInput({ onAddTask }) {
    // Local state for input value
    const [inputValue, setInputValue] = useState('');

    // Local state for validation error message
    const [error, setError] = useState('');

    /**
     * Handle input change
     */
    function handleInputChange(e) {
        setInputValue(e.target.value);
        // Clear error when user starts typing
        if (error && e.target.value.trim()) {
            setError('');
        }
    }

    /**
     * Handle form submission
     */
    function handleSubmit(e) {
        e.preventDefault();

        // Validate non-empty input
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            setError('Task cannot be empty');
            return;
        }

        // Call the callback with the task text
        onAddTask(trimmedValue);

        // Clear input and error after successful submission
        setInputValue('');
        setError('');
    }

    /**
     * Handle Enter key press
     */
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <div className="task-input-container">
            <form onSubmit={handleSubmit} className="task-input-form">
                <input
                    type="text"
                    className={`task-input ${error ? 'task-input-error' : ''}`}
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    aria-label="New task input"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'task-input-error' : undefined}
                />
                <button
                    type="submit"
                    className="task-input-submit"
                    aria-label="Add task"
                >
                    Add Task
                </button>
            </form>

            {/* Inline validation feedback */}
            {error && (
                <p id="task-input-error" className="task-input-error-message" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default TaskInput;
