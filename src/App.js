import { useState } from 'react';
import './App.css';
import AddIcon from './assets/AddIcon';
import KanbanBoard from './components/KanbanBoard';
import UtilityFunctions from './utility/UtilityFunctions';

function App() {
  const [boards, setBoards] = useState([]);

  const addNewBoard = () => {
    const board = {
      id: UtilityFunctions.generateId(),
      title: `Board ${boards.length + 1}`
    };
    setBoards([
      ...boards,
      board
    ]);
  };

  const onDeleteBoard = (id) => {
    const filterBoards = boards.filter((item) => item.id !== id);
    setBoards([...filterBoards]);
  };

  return (
    <div className="main-app">
      <div className="boards">
        {boards.map((board) => {
          return <KanbanBoard props={board} key={board.id} onDeleteBoard={onDeleteBoard} />;
        })}
      </div>
      <div className="add-board">
        <button type='submit' className='btn-primary' onClick={addNewBoard}>
          <AddIcon />
          Add Board
        </button>
      </div>
    </div>
  );
}

export default App;
