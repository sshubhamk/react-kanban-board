import UtilityFunctions from "../utility/UtilityFunctions";

export const DEFAULT_BOARD = [
  {
    id: UtilityFunctions.generateId(),
    color: UtilityFunctions.generateRandomColor(),
    title: 'Backlog',
    cards: [
      {
        id: UtilityFunctions.generateId(),
        title: 'Set up project repository and setup main',
        description: 'Initialize the GitHub repository and set up the main branch.Initialize the GitHub repository and set up the main branch.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Write project documentation',
        description: 'Draft the initial README with project goals and setup instructions.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Design wireframes',
        description: 'Create wireframes for the main dashboard and user flows.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Research authentication options',
        description: 'Compare OAuth, JWT, and social login for user authentication.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Set up project repository and setup main',
        description: 'Initialize the GitHub repository and set up the main branch.Initialize the GitHub repository and set up the main branch.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Write project documentation',
        description: 'Draft the initial README with project goals and setup instructions.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Design wireframes',
        description: 'Create wireframes for the main dashboard and user flows.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Research authentication options',
        description: 'Compare OAuth, JWT, and social login for user authentication.',
      },
    ]
  },
  {
    id: UtilityFunctions.generateId(),
    color: UtilityFunctions.generateRandomColor(),
    title: 'To Do',
    cards: [
      {
        id: UtilityFunctions.generateId(),
        title: 'Implement login page',
        description: 'Build the login form and connect it to the authentication API.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment.',
      },
    ]
  },
  {
    id: UtilityFunctions.generateId(),
    color: UtilityFunctions.generateRandomColor(),
    title: 'In Progress',
    cards: [
      {
        id: UtilityFunctions.generateId(),
        title: 'Create Kanban board UI',
        description: 'Develop the main Kanban board interface with drag-and-drop.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'API integration',
        description: 'Connect frontend components to backend endpoints for boards and cards.',
      },
    ]
  },
  {
    id: UtilityFunctions.generateId(),
    color: UtilityFunctions.generateRandomColor(),
    title: 'Done',
    cards: [
      {
        id: UtilityFunctions.generateId(),
        title: 'Set up project structure',
        description: 'Created the initial folder structure for the React Kanban app.',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Install dependencies',
        description: 'Installed React, Ant Design, and other required libraries.',
      },
    ]
  },
].map(board => ({
  ...board,
  cards: board.cards.map(card => ({
    ...card,
    boardId: board.id,
  })),
}));