const KanbanCard = ({ props }) => {

  const cardStyles = {
    height: '150px',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: 'inset 0 0 0.5px 1px hsla(0,0%,100%,0.075), 0 0 0 1px hsla(0,0%,0%,0.05), 0 0.3px 0.4px hsla(0,0%,0%,0.02), 0 0.9px 1.5px hsla(0,0%,0%,0.045), 0 3.5px 6px hsla(0,0%,0%,0.09)',
  };

  const titleStyles = {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '0.5rem',
  };

  const descriptionStyles = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    margin: 0,
    whiteSpace: 'normal'
  };

  return (
    <div style={cardStyles}>
      <div style={{
        height: '80px',
        overflow: 'hidden'
      }}>
        <h3 style={titleStyles}>{props.title}</h3>
        <p style={descriptionStyles}>{props.description}</p>
      </div>
    </div>
  );
};

export default KanbanCard;