import { Button } from 'antd';
import { useMemo } from 'react';
import AddIcon from '../assets/AddIcon';
import { addBoardBtnStyle, mainBoardStyle } from '../styles/styles';
import KanbanBoard from './KanbanBoard';

const Section = ({ mainBg, mainColor, addNewBoard, filteredSections, onDeleteBoard, onUpdateTitle, addNewCard }) => {
  const sectionStyle = useMemo(() => ({
    background: mainBg,
    color: mainColor,
    display: 'flex',
    gap: '1rem',
  }), [mainBg, mainColor]);

  return (
    <div style={mainBoardStyle}>
      <div style={sectionStyle}>
        {filteredSections?.map((board) => (
          <KanbanBoard
            props={board}
            key={board.id}
            onDeleteBoard={onDeleteBoard}
            onUpdateTitle={onUpdateTitle}
            addNewCard={addNewCard}
          />
        ))}
      </div>

      <div style={{
        minHeight: '50px',
        minWidth: '50px',
      }}>
        <Button style={addBoardBtnStyle} type="primary" onClick={addNewBoard}>
          <AddIcon />
        </Button>
      </div>
    </div>
  )
}

export default Section;