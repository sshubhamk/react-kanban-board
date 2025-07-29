import { cardStyles, titleStyles, descriptionStyles } from '../styles/styles';

const KanbanCard = ({ props }) => {

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