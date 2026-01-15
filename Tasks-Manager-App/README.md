# Task Manager App

A modern, feature-rich task management application built with React 19 and Vite. Manage your tasks efficiently with a clean, intuitive interface and persistent storage.

![Task Manager](https://img.shields.io/badge/React-19-blue.svg)
![Vite](https://img.shields.io/badge/Vite-Latest-purple.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green.svg)

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks
- 🔄 **Real-time Updates** - Instant UI updates with React state management
- 💾 **Persistent Storage** - Tasks saved to localStorage automatically
- 🎯 **Smart Filtering** - Filter by All, Active, or Completed tasks
- ✏️ **Inline Editing** - Edit tasks directly with double-click or edit button
- ⌨️ **Keyboard Shortcuts** - Enter to save, Escape to cancel
- ✔️ **Toggle Completion** - Mark tasks as complete/incomplete
- 🎨 **Modern UI** - Beautiful gradient background with clean card design
- ♿ **Accessible** - WCAG 2.1 compliant with full keyboard navigation
- 📱 **Responsive** - Mobile-friendly design that works on all devices
- 🎭 **Visual Feedback** - Clear indicators for completed tasks and active filters
- 🔢 **Active Counter** - Real-time display of remaining tasks

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Tasks-Manager-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist/` directory.

## 🎮 Usage

### Adding Tasks
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Task appears immediately in the list

### Managing Tasks
- **Complete/Uncomplete**: Click the checkbox next to any task
- **Edit**: Double-click task text or click the edit button (✎)
  - Press Enter to save or Escape to cancel
- **Delete**: Click the delete button (🗑) to remove a task

### Filtering Tasks
- **All**: Show all tasks (default)
- **Active**: Show only incomplete tasks
- **Completed**: Show only completed tasks

### Data Persistence
All tasks are automatically saved to your browser's localStorage. Your tasks will persist even after closing the browser or refreshing the page.

## 🏗️ Project Structure

```
Tasks-Manager-App/
├── src/
│   ├── components/
│   │   ├── TaskInput.jsx       # Input component for adding tasks
│   │   ├── TaskInput.css
│   │   ├── TaskList.jsx        # List container component
│   │   ├── TaskList.css
│   │   ├── TaskItem.jsx        # Individual task component
│   │   ├── TaskItem.css
│   │   ├── TaskFilters.jsx     # Filter controls component
│   │   └── TaskFilters.css
│   ├── App.jsx                 # Main app component (state management)
│   ├── App.css                 # App-specific styles
│   ├── index.css               # Global styles and design system
│   └── main.jsx                # App entry point
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── vite.config.js             # Vite configuration
├── PRD.md                      # Product Requirements Document
└── README.md                   # This file
```

## 🔧 Component API

### TaskInput
Props:
- `onAddTask: (text: string) => void` - Callback when task is added

### TaskList
Props:
- `tasks: Task[]` - Array of filtered tasks to display
- `onToggle: (id: string) => void` - Callback to toggle task completion
- `onDelete: (id: string) => void` - Callback to delete task
- `onEdit: (id: string, newText: string) => void` - Callback to edit task

### TaskItem
Props:
- `task: Task` - Task object `{ id, text, completed }`
- `onToggle: (id: string) => void` - Callback to toggle completion
- `onDelete: (id: string) => void` - Callback to delete
- `onEdit: (id: string, newText: string) => void` - Callback to edit

### TaskFilters
Props:
- `filter: 'all' | 'active' | 'completed'` - Current filter
- `activeCount: number` - Number of active tasks
- `onSetFilter: (filter: string) => void` - Callback to change filter

## 🎨 Design System

The app uses a comprehensive design system with CSS variables:

- **Colors**: Purple gradient theme with accessible contrast
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography**: Modern font stack with Inter as primary
- **Shadows**: Three-level shadow system (sm, md, lg)
- **Transitions**: Smooth animations throughout

## ♿ Accessibility Features

- Full keyboard navigation support
- ARIA labels on all interactive elements
- Clear focus indicators (WCAG 2.1 compliant)
- Semantic HTML structure
- Screen reader friendly
- Reduced motion support

## 🧪 Testing

The application has been comprehensively tested:

- ✅ All CRUD operations
- ✅ Filter functionality
- ✅ localStorage persistence
- ✅ Input validation
- ✅ Edge cases and error handling
- ✅ Accessibility compliance
- ✅ Responsive design
- ✅ Browser compatibility

See `walkthrough.md` in the artifacts directory for detailed test results.

## 🛠️ Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **localStorage** - Client-side data persistence
- **crypto.randomUUID()** - Unique ID generation

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Developer

Built with ❤️ using React and Vite

---

**Ready for Production** ✅ | **Zero Console Errors** ✅ | **Fully Tested** ✅
