import { Dropdown, Space, Typography } from 'antd';
import { useState } from 'react';
import OptionIcon from '../assets/OptionIcon';
import '../styles/KanbanBoard.css';
import KanbanCard from './KanbanCard';

const KanbanBoard = ({ props, onDeleteBoard }) => {
  const board = props;
  const [isEditTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(board.title);

  const inputStyles = {
    width: '85%',
    padding: '8px',
    borderRadius: '8px',
    outline: 'none',
    border: '1px solid #d9d9d9',
  };

  const actionItemsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e0e0e0',
  };

  const actionStyles = {
    background: 'transparent',
    border: 'none',
  };

  const optionItems = [
    {
      key: 'edit',
      label: 'Edit Board Title',
      onClick: () => setEditTitle(!isEditTitle),
    },
    {
      key: 'delete',
      label: 'Delete Board',
      onClick: () => onDeleteBoard(board.id),
    },
  ];

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditTitle(false);
      if (props.onUpdateTitle) {
        props.onUpdateTitle(board.id, title);
      }
    }
  };

  const displayTitle = () => (
    isEditTitle ?
      <input
        style={inputStyles}
        type="text"
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleTitleKeyDown}
        autoFocus
      /> :
      <h3>{title}</h3>
  );

  return (
    <div className='main-board'>
      <div style={actionItemsStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            background: board.color,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            display: 'inline-block',
          }}></span>
          {displayTitle()}
        </div>
        <button style={actionStyles} type='button' onClick={() => { }}>
          <Dropdown
            menu={{
              items: optionItems,
              selectable: true,
            }}
          >
            <Typography.Link>
              <Space>
                <OptionIcon />
              </Space>
            </Typography.Link>
          </Dropdown>
        </button>
      </div>
      <KanbanCard />
    </div>
  );
};

export default KanbanBoard;