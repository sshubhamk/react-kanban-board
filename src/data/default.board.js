import UtilityFunctions from "../utility/UtilityFunctions";

export const DEFAULT_BOARD = [
  {
    id: UtilityFunctions.generateId(),
    color: UtilityFunctions.generateRandomColor(),
    title: 'Backlogs',
    cards: [
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
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
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
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
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
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
        title: 'Task 1',
        description: 'Description for Task 1',
      },
      {
        id: UtilityFunctions.generateId(),
        title: 'Task 2',
        description: 'Description for Task 2',
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