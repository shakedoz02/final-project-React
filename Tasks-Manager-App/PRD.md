# Task Manager App — Product Requirements Document (PRD)

## Overview 💡
This document describes the product requirements for a simple Task Manager application built with **React 19** and **Vite**. The goal is to implement a clean, maintainable React app that supports CRUD operations on tasks, filtering, persistent storage via `localStorage`, and clear separation of concerns across components.

---

## Goals & Success Metrics 🎯
- Provide a minimal, polished UI to add, edit, toggle, and delete tasks.
- Tasks persist across page refreshes using `localStorage`.
- The app uses functional components only and standard CSS for styling.
- No console warnings in development.
- Measurable success: user can add a task and see it after refresh; filter and counter work as expected.

---

## Scope
- In-scope: Task CRUD operations, filtering (All, Active, Completed), persistent storage, visual filter highlighting, active task counter.
- Out-of-scope: Authentication, routing, external state libraries, server persistence.

---

## User Stories
- As a user, I can add a new task so I can track things to do.
- As a user, I can toggle a task as completed or active.
- As a user, I can edit the text of a task.
- As a user, I can delete a task.
- As a user, I can filter the shown tasks by All, Active, or Completed, and see how many active tasks remain.
- **As a user, I can clear all completed tasks at once to quickly clean up my task list.**

---

## Functional Requirements / Component Responsibilities 🔧
The app will be composed of the following components (minimum):

- `App.jsx` — Main container and single source of truth for application state and core logic. Responsible for:
  - Holding the `tasks` and `filter` state
  - Loading tasks from `localStorage` on startup and saving on change
  - Providing CRUD operations as callback props to children
  - Computing derived data such as active task count and filtered task set

- `TaskInput.jsx` — Controlled form for adding a new task. Responsibilities:
  - Manage input state locally
  - Validate non-empty input
  - Call a provided `onAddTask(text)` callback

- `TaskList.jsx` — Renders a list of tasks according to the current filter. Responsibilities:
  - Receive `tasks` (already filtered) and render a list of `TaskItem` components
  - Expose a fallback message when the list is empty

- `TaskItem.jsx` — Represents a single task. Responsibilities:
  - Render task text and completion state
  - Support toggling completion, entering edit mode, saving edits, and deleting
  - Emit `onToggle(id)`, `onDelete(id)`, `onEdit(id, newText)` events

- `TaskFilters.jsx` — Provides filter controls and displays remaining active task count. Responsibilities:
  - Render filter buttons (All, Active, Completed) with visual highlight for the active filter
  - Show active tasks count
  - Call `onSetFilter(filter)` when filter changes
  - **Render a "Clear Completed" button that removes all completed tasks from the list**
  - **The button should only be visible when there is at least one completed task**
  - **Call `onClearCompleted()` when the button is clicked**

---

## Data Model & State Design in `App.jsx` 📦
**Task object schema**
- Each task is an object with the following properties:
  - `id: string` — unique identifier (stable between sessions)
  - `text: string` — the task content
  - `completed: boolean` — completion flag

**Suggested `App.jsx` state variables (conceptual, not code):**
- `tasks` (Array of task objects)
  - Initial value: an empty array or the array loaded/validated from `localStorage`.
  - Source of truth for all task CRUD operations.

- `filter` (string union: `'all' | 'active' | 'completed'`)
  - Initial value: `'all'`.
  - Controls which tasks are passed to `TaskList`.

- (Optional) `editingId` (string | null)
  - Tracks which task (if any) is currently being edited. Alternatively, the edit state can be local to `TaskItem`.

**Derived values computed in `App.jsx`:**
- `activeCount` — number of tasks with `completed === false`.
- `visibleTasks` — tasks filtered based on the `filter` value.

**Notes on identifiers:**
- Use a reliable id generation strategy (e.g., `crypto.randomUUID()` when available, otherwise a combination of timestamp + random suffix). Avoid collisions to keep edit/delete operations deterministic.

---

## LocalStorage Synchronization Strategy (Behavioral spec, not code) 🔁
- Purpose: Persist `tasks` so that a page refresh restores the user's tasks.

- Startup (load):
  1. On app initialization, attempt to read `localStorage.getItem('tasks')`.
  2. If the key exists, parse the JSON into an array and validate schema (each item has `id`, `text`, `completed`).
  3. If parsing fails or validation fails, discard the data and fall back to an empty list (also avoid throwing uncaught exceptions).
  4. Use the validated array to initialize the `tasks` state.

- Runtime (save):
  1. Whenever `tasks` change (add/edit/toggle/delete), serialize the array to JSON and write it to `localStorage.setItem('tasks', jsonString')`.
  2. Ensure serialization and write are inside a safe try/catch to avoid uncaught errors (e.g., storage quota). Gracefully handle failures (e.g., console.warn with human-readable message or show non-blocking UI feedback if necessary), but avoid noisy console errors in normal scenarios.

- Implementation notes:
  - Prefer initializing `tasks` using a lazy initializer so the load from `localStorage` happens once during mount.
  - Keep the `save` step efficient (no heavy computation) and scoped to when `tasks` actually change.

---

## Component Contract / Props (Interface outline) 🧩
- `TaskInput` props: `{ onAddTask: (text: string) => void }`
- `TaskFilters` props: `{ filter: 'all'|'active'|'completed', activeCount: number, onSetFilter: (f) => void }`
- `TaskList` props: `{ tasks: Task[], onToggle, onDelete, onEdit }`
- `TaskItem` props: `{ task: Task, onToggle: (id) => void, onDelete: (id) => void, onEdit: (id, newText) => void }`

(These are conceptual signatures — the exact prop names and shapes can be adjusted for style and convenience.)

---

## UX / Visual Requirements 🎨
- Filter button for the current filter must be visually distinct (e.g., bold or highlighted background).
- Completed tasks should have a visual indicator (e.g., line-through or dimmed text).
- The counter should clearly read like: "3 tasks remaining" and update in real-time.
- Form input should validate empty submissions and show inline validation if a user tries to submit an empty task.

---

## Acceptance Criteria ✅
- Adding a task creates a new task with a unique `id`, text, and `completed: false` and immediately appears in the list.
- Toggling a task updates its `completed` flag and the active task counter.
- Editing a task updates its text in the list and in `localStorage`.
- Deleting a task removes it from the list and `localStorage`.
- Filter buttons filter the list and show the active filter visually.
- Tasks persist when the page is refreshed.
- No warnings are emitted to the console in development for normal usage.

---

## Edge Cases & Error Handling ⚠️
- `localStorage` contains invalid JSON — fall back to an empty list and avoid throwing errors.
- `localStorage` write fails (quota) — do not crash the app; consider notifying via console.warn or a subtle UI message.
- Rapid updates — ensure writes are consistent and do not cause race conditions (simple apps: last write wins is acceptable).

---

## Implementation Plan (Step-by-step) 🛠️
1. Define state structure and localStorage sync logic in `App.jsx` (this is the current step; no code yet).
2. Implement `TaskInput`, `TaskList`, `TaskItem`, and `TaskFilters` with the described props and responsibilities.
3. Wire up callbacks in `App.jsx` to provide add/toggle/edit/delete functionality and filtering.
4. Add standard CSS styling and ensure accessibility basics (labels, focus states).
5. Test manually and fix console warnings and edge cases.

---

## Tests & QA ✅
- Manual test cases for add/toggle/edit/delete, filter toggling, and refresh persistence.
- Verify there are no console warnings during normal usage.

---

## Non-functional Constraints
- Use **React 19** and **Vite**.
- Use functional components and React hooks only (no class components).
- Use standard CSS (no CSS-in-JS required).
- No external state libraries or routing.

---

## Deliverables
- `PRD.md` (this document)
- Planned component files and a clean `App.jsx` that implements the state and localStorage synchronization
- Styling and manual test notes

---

## Next steps
- Upon approval, implement the `App.jsx` state variables and localStorage synchronization (first code step). After that, implement the components in order and wire them up.

---
    