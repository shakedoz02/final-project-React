import './TaskFilters.css';

/**
 * TaskFilters Component
 * Provides filter controls and displays remaining active task count
 * 
 * Props:
 * - filter: 'all' | 'active' | 'completed' - Current filter value
 * - activeCount: number - Number of active (incomplete) tasks
 * - completedCount: number - Number of completed tasks
 * - onSetFilter: (filter: string) => void - Callback to change filter
 * - onClearCompleted: () => void - Callback to clear all completed tasks
 */
function TaskFilters({ filter, activeCount, completedCount, onSetFilter, onClearCompleted }) {
    /**
     * Handle filter button click
     */
    function handleFilterClick(newFilter) {
        onSetFilter(newFilter);
    }

    /**
     * Handle clear completed button click
     */
    function handleClearCompleted() {
        onClearCompleted();
    }

    return (
        <div className="task-filters">
            {/* Active tasks counter */}
            <div className="task-filters-counter">
                <span className="task-count">{activeCount}</span>
                <span className="task-count-label">
                    {activeCount === 1 ? 'task' : 'tasks'} remaining
                </span>
            </div>

            {/* Filter buttons */}
            <div className="task-filters-buttons">
                <button
                    className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
                    onClick={() => handleFilterClick('all')}
                    aria-label="Show all tasks"
                    aria-pressed={filter === 'all'}
                >
                    All
                </button>

                <button
                    className={`filter-btn ${filter === 'active' ? 'filter-btn-active' : ''}`}
                    onClick={() => handleFilterClick('active')}
                    aria-label="Show active tasks"
                    aria-pressed={filter === 'active'}
                >
                    Active
                </button>

                <button
                    className={`filter-btn ${filter === 'completed' ? 'filter-btn-active' : ''}`}
                    onClick={() => handleFilterClick('completed')}
                    aria-label="Show completed tasks"
                    aria-pressed={filter === 'completed'}
                >
                    Completed
                </button>
            </div>

            {/* Clear Completed button - only visible when there are completed tasks */}
            {completedCount > 0 && (
                <button
                    className="clear-completed-btn"
                    onClick={handleClearCompleted}
                    aria-label={`Clear ${completedCount} completed ${completedCount === 1 ? 'task' : 'tasks'}`}
                >
                    Clear Completed
                </button>
            )}
        </div>
    );
}

export default TaskFilters;
