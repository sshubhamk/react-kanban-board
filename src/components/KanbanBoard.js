import { Dropdown, Modal, Space, Typography } from 'antd';
import { useState } from 'react';
import OptionIcon from '../assets/OptionIcon';
import { actionItemsStyle, actionStyles, cardInputStyles, inputStyles, mainBoardStyles } from '../styles/styles';
import KanbanCard from './KanbanCard';

const KanbanBoard = ({ props, onDeleteBoard, onUpdateTitle, addNewCard }) => {
  const board = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [isEditTitle, setEditTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  const optionItems = [
    {
      key: 'addCard',
      label: 'Add Card',
      onClick: () => {
        setEditTitle(!isEditTitle);
        setIsModalOpen(true);
      },
    },
    {
      key: 'edit',
      label: 'Edit Board Title',
      onClick: () => {
        setEditTitle(!isEditTitle)
      },
    },
    {
      key: 'delete',
      label: 'Delete Board',
      onClick: () => onDeleteBoard(board.id),
    },
  ];

  const handleOk = () => {
    setIsModalOpen(!isModalOpen);
    if (cardTitle) {
      const newCard = { cardTitle, cardDescription };
      addNewCard(board.id, newCard);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditTitle(false);
      if (onUpdateTitle) {
        onUpdateTitle(board.id, title);
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
    <div style={mainBoardStyles}>
      <div style={actionItemsStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{
            border: `3px solid ${board.color}`,
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            display: 'inline-block',
          }}>
          </span>
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
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', height: '650px' }}>
        {board?.cards?.map((card) => (
          <KanbanCard key={card.id} props={card} />
        ))}
      </div>

      <Modal
        title="Add New Card"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          <input style={cardInputStyles} type='text' value={cardTitle} placeholder='Card Title'
            onChange={e => setCardTitle(e.target.value)} />
          <textarea style={cardInputStyles} value={cardDescription} placeholder='Card Description'
            onChange={e => setCardDescription(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
};

export default KanbanBoard;