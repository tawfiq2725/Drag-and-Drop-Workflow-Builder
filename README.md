# Workflow Builder

A powerful drag-and-drop workflow builder application built with React, TypeScript, and Redux.

![Workflow Builder Screenshot](https://via.placeholder.com/800x400?text=Workflow+Builder+Screenshot)

## Features

- **Intuitive Drag-and-Drop Interface**: Create workflows by dragging nodes from a palette onto a canvas
- **Multiple Node Types**: Start, Process, and Decision nodes with distinctive styling
- **Node Customization**: Edit node properties through a dedicated properties panel
- **Interactive Connections**: Create logic flows by connecting nodes with custom handle positions
- **State Management**: Robust Redux implementation with RTK (Redux Toolkit)
- **Data Persistence**: Save and load workflows (currently using localStorage)
- **Responsive Design**: Built with Tailwind CSS for a premium, responsive UI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/workflow-builder.git
   cd workflow-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
workflow-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── Canvas/
│   │   ├── Header/
│   │   ├── NodePalette/
│   │   ├── PropertiesPanel/
│   │   └── nodes/
│   ├── hooks/
│   │   ├── useNodeSelection.ts
│   │   └── useWorkflow.ts
│   ├── store/
│   │   ├── workflowSlice.ts
│   │   └── store.ts
│   ├── services/
│   │   └── workflowService.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Usage Guide

### Creating a Workflow

1. **Add Nodes**: Drag node types from the left sidebar onto the canvas
2. **Connect Nodes**: Click and drag from a node's output handle to another node's input handle
3. **Configure Nodes**: Select a node and edit its properties in the right panel
4. **Save Workflow**: Click the save button in the header to persist your workflow

### Node Types

- **Start Node**: The entry point of your workflow (only one allowed per workflow)
- **Process Node**: Represents an action or task in your workflow
- **Decision Node**: Creates branching logic with Yes/No outputs

### Keyboard Shortcuts

- **Delete/Backspace**: Remove selected nodes
- **Ctrl+S**: Save current workflow
- **Ctrl+Z**: Undo last action
- **Ctrl+Y**: Redo last action

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety and developer experience
- **Redux Toolkit**: State management
- **ReactFlow**: Interactive node-based UI
- **Tailwind CSS**: Styling and responsive design

## Future Enhancements

- Backend API integration for persistent storage
- Custom node type creation
- Workflow validation and error checking
- Workflow simulation/execution
- Team collaboration features
- Export/import functionality (JSON, SVG)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ReactFlow](https://reactflow.dev/) for the interactive canvas
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
