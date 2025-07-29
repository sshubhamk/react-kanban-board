
// App.js
export const themeSwitchBtnStyle = {
  boxShadow: 'none',
  border: 'none',
  background: 'transparent',
};

export const addBoardBtnStyle = {
  padding: '0.5rem',
  borderRadius: '8px',
  marginTop: '1rem',
  transition: 'transform 0.2s',
};

export const mainBoardStyle = {
  display: 'flex',
  gap: '1rem',
  paddingBottom: '1rem',
};

// KanbanBoard.js

export const inputStyles = {
  width: '85%',
};

export const cardInputStyles = {
  width: '100%',
}

export const actionItemsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #e0e0e0',
};

export const actionStyles = {
  background: 'transparent',
  border: 'none',
};

export const mainBoardStyles = {
  width: '400px',
  minHeight: '100%',
  padding: '1rem 1rem 0 1rem',
  marginTop: '1rem',
  borderRadius: '8px',
  border: '2px solid transparent',
  boxShadow: 'inset 0 0 0.5px 1px hsla(0,0%,100%,0.075), 0 0 0 1px hsla(0,0%,0%,0.05), 0 0.3px 0.4px hsla(0,0%,0%,0.02), 0 0.9px 1.5px hsla(0,0%,0%,0.045), 0 3.5px 6px hsla(0,0%,0%,0.09)'
};

// KanbanCard.js

export const cardStyles = {
  height: '150px',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: 'inset 0 0 0.5px 1px hsla(0,0%,100%,0.075), 0 0 0 1px hsla(0,0%,0%,0.05), 0 0.3px 0.4px hsla(0,0%,0%,0.02), 0 0.9px 1.5px hsla(0,0%,0%,0.045), 0 3.5px 6px hsla(0,0%,0%,0.09)',
};

export const titleStyles = {
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '0.5rem',
};

export const descriptionStyles = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  margin: 0,
  whiteSpace: 'normal'
};