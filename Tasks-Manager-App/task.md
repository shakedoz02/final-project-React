# Task Manager App - Implementation Tasks

## 1. Project Setup & Configuration
- [x] Initialize React 19 + Vite project
- [x] Configure ESLint and development environment
- [x] Set up project structure (components, styles)
- [x] Create PRD.md documentation

## 2. Core State Management & Data Layer
- [ ] Define task data model schema (id, text, completed)
- [ ] Implement state structure in `App.jsx`
  - [ ] `tasks` state array
  - [ ] `filter` state ('all' | 'active' | 'completed')
- [ ] Implement localStorage synchronization
  - [ ] Load tasks from localStorage on app startup
  - [ ] Validate and parse localStorage data with error handling
  - [ ] Save tasks to localStorage on every state change
  - [ ] Handle edge cases (invalid JSON, quota exceeded)
- [ ] Implement derived values computation
  - [ ] Calculate `activeCount` (tasks with completed === false)
  - [ ] Calculate `visibleTasks` based on current filter

## 3. Component Implementation

### 3.1 TaskInput Component
- [ ] Create `TaskInput.jsx` component
- [ ] Implement controlled input field
- [ ] Add local state management for input value
- [ ] Validate non-empty input submissions
- [ ] Implement `onAddTask(text)` callback integration
- [ ] Add inline validation feedback for empty submissions

### 3.2 TaskList Component
- [ ] Create `TaskList.jsx` component
- [ ] Receive filtered tasks array as prop
- [ ] Map tasks to `TaskItem` components
- [ ] Display fallback message when list is empty
- [ ] Pass through CRUD callbacks to TaskItem

### 3.3 TaskItem Component
- [ ] Create `TaskItem.jsx` component
- [ ] Display task text and completion state
- [ ] Implement toggle completion functionality with `onToggle(id)`
- [ ] Implement delete functionality with `onDelete(id)`
- [ ] Add edit mode support
  - [ ] Toggle between view and edit mode
  - [ ] Save edited text with `onEdit(id, newText)`
  - [ ] Cancel edit functionality
- [ ] Apply visual styling for completed tasks (line-through/dimmed)

### 3.4 TaskFilters Component
- [ ] Create `TaskFilters.jsx` component
- [ ] Render filter buttons (All, Active, Completed)
- [ ] Highlight active filter visually (bold/background)
- [ ] Display active tasks counter ("X tasks remaining")
- [ ] Implement `onSetFilter(filter)` callback

## 4. App Integration
- [ ] Wire up CRUD operations in `App.jsx`
  - [ ] `addTask(text)` - generate unique ID, add to tasks
  - [ ] `toggleTask(id)` - flip completed flag
  - [ ] `editTask(id, newText)` - update task text
  - [ ] `deleteTask(id)` - remove from tasks array
- [ ] Implement filter logic
  - [ ] `setFilter(filter)` - update filter state
  - [ ] Filter tasks based on current filter value
- [ ] Pass callbacks as props to child components
- [ ] Ensure localStorage sync on all state changes

## 5. Styling & UI/UX
- [ ] Create global styles in `App.css` or `index.css`
- [ ] Style TaskInput component
  - [ ] Input field styling
  - [ ] Submit button styling
  - [ ] Validation error feedback
- [ ] Style TaskList component
  - [ ] List container styling
  - [ ] Empty state message styling
- [ ] Style TaskItem component
  - [ ] Task text display
  - [ ] Completed state visual (line-through/dimmed)
  - [ ] Edit mode input styling
  - [ ] Action buttons (edit, delete, toggle)
- [ ] Style TaskFilters component
  - [ ] Filter buttons layout
  - [ ] Active filter highlight styling
  - [ ] Counter display styling
- [ ] Add accessibility features
  - [ ] Proper labels for form inputs
  - [ ] Focus states for interactive elements
  - [ ] Keyboard navigation support

## 6. ID Generation
- [ ] Implement reliable unique ID generation
  - [ ] Use `crypto.randomUUID()` if available
  - [ ] Fallback to timestamp + random suffix
  - [ ] Ensure no ID collisions

## 7. Testing & Quality Assurance
- [ ] Manual testing - Add task functionality
  - [ ] Verify task appears immediately
  - [ ] Verify unique ID generation
  - [ ] Verify default completed: false
- [ ] Manual testing - Toggle task functionality
  - [ ] Verify completed flag updates
  - [ ] Verify active counter updates
  - [ ] Verify visual state changes
- [ ] Manual testing - Edit task functionality
  - [ ] Verify text updates in UI
  - [ ] Verify updates persist to localStorage
- [ ] Manual testing - Delete task functionality
  - [ ] Verify task removed from UI
  - [ ] Verify removal persists to localStorage
- [ ] Manual testing - Filter functionality
  - [ ] Test All filter shows all tasks
  - [ ] Test Active filter shows only incomplete
  - [ ] Test Completed filter shows only completed
  - [ ] Verify visual filter highlight
- [ ] Manual testing - Persistence
  - [ ] Add tasks and refresh page
  - [ ] Verify tasks remain after refresh
  - [ ] Verify filter state (if persisted)
- [ ] Edge case testing
  - [ ] Invalid localStorage JSON handling
  - [ ] localStorage quota exceeded handling
  - [ ] Empty task submission prevention
  - [ ] Rapid state updates
- [ ] Console verification
  - [ ] Verify no warnings in development mode
  - [ ] Verify no errors during normal usage

## 8. Documentation & Cleanup
- [ ] Update README.md with setup instructions
- [ ] Document component props and interfaces
- [ ] Add code comments for complex logic
- [ ] Remove any unused imports or code
- [ ] Final code review and formatting

## Acceptance Criteria Checklist
- [ ] Adding a task creates new task with unique ID, text, and completed: false
- [ ] Task appears immediately in the list
- [ ] Toggling task updates completed flag and active counter
- [ ] Editing task updates text in list and localStorage
- [ ] Deleting task removes from list and localStorage
- [ ] Filter buttons correctly filter the task list
- [ ] Active filter is visually distinct
- [ ] Tasks persist across page refresh
- [ ] No console warnings during normal usage
- [ ] Empty task submissions are prevented with validation
- [ ] Completed tasks have visual indicator (line-through/dimmed)
- [ ] Counter displays "X tasks remaining" and updates in real-time
