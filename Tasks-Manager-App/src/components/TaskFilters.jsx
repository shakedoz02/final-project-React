import './TaskFilters.css';

/**
 * TaskFilters Component
 * Provides filter controls and displays remaining active task count
 * 
 * Props:
 * - filter: 'all' | 'active' | 'completed' - Current filter value
 * - activeCount: number - Number of active (incomplete) tasks
 * - onSetFilter: (filter: string) => void - Callback to change filter
 */
function TaskFilters({ filter, activeCount, onSetFilter }) {
    /**
     * Handle filter button click
     */
    function handleFilterClick(newFilter) {
        onSetFilter(newFilter);
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
        </div>
    );
}

export default TaskFilters;
