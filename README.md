# Azure DevOps Task Tracker

A React + TypeScript task management app for tracking Azure DevOps work items.

## Features

- Add tasks with Project Name, Azure DevOps ID, Task Description, Status, and Remarks
- Color-coded status badges (9 statuses)
- Inline row editing and deletion
- Export all tasks to Excel (.xls)
- Live stats bar (Total / In Progress / Done)
- Full TypeScript type safety

## Project Structure

```
src/
├── types/
│   └── index.ts           # TypeScript interfaces & types
├── utils/
│   ├── constants.ts       # STATUS_OPTIONS, STATUS_COLORS, EMPTY_FORM
│   └── helpers.ts         # exportToExcel(), validateForm()
├── components/
│   ├── StatusBadge.tsx    # Colored status pill
│   ├── FormField.tsx      # Reusable labeled field wrapper
│   ├── TaskForm.tsx       # Add-task form (single row)
│   ├── TaskGrid.tsx       # Table with export button
│   └── TaskRow.tsx        # Row with inline edit/delete
├── App.tsx                # Root component + state management
└── index.tsx              # React DOM entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

App runs at http://localhost:3000

## Status Options

| Status | Color |
|--------|-------|
| Analysis | Blue |
| Dev In Progress | Amber |
| Dev Complete | Green |
| PR Raised | Purple |
| PR Approved | Teal |
| PR Merged | Indigo |
| QA In Progress | Orange |
| QA Complete | Lime |
| Done | Emerald |



ngrok http 3000

link: ngrok  :  https://unvulnerable-histiocytic-tatyana.ngrok-free.dev/




echo "# Azure_DevOps_Task_Tracker" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/pradeepdevloper1/Azure_DevOps_Task_Tracker.git
git push -u origin main