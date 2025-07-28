export type Board = {
  id: number | string,
  color: string,
  title: string,
  cards: Card[]
};

export type Card = {
  id: number | string,
  title: string,
  description: string,
  boardId: number | string,
};

