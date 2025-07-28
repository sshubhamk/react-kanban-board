const KanbanCard = ({ props }) => {

  const cardStyles = {
    height: '150px',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: 'inset 0 0 0.5px 1px hsla(0,0%,100%,0.075), 0 0 0 1px hsla(0,0%,0%,0.05), 0 0.3px 0.4px hsla(0,0%,0%,0.02), 0 0.9px 1.5px hsla(0,0%,0%,0.045), 0 3.5px 6px hsla(0,0%,0%,0.09)',
  };

  return (
    <div style={cardStyles}>
      <h3 style={{ marginBottom: '0.5rem' }}>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default KanbanCard;