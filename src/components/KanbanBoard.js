import React, { useState } from 'react';
import '../styles/KanbanBoard.css';
import KanbanCard from './KanbanCard';
import TrashIcon from '../assets/TrashIcon';

const KanbanBoard = ({ props, onDeleteBoard }) => {

  const board = props;
  const [isEditTitle, setEditTitle] = useState(false);

  const actionItemsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e0e0e0',
  };

  const displayTitle = () => {
    return isEditTitle ?
      <input type="text" value={board.title} /> :
      <h3>{board.title}</h3>;
  };

  return (
    <div className='main-board'>
      <div style={actionItemsStyle} className="action-items">
        {displayTitle()}
        <button type='button' onClick={() => {
          onDeleteBoard(board.id);
        }}>
          <TrashIcon />
        </button>
      </div>
      <KanbanCard />
    </div>
  );
};

export default KanbanBoard;