import React from 'react';

const Element = ({ element, onClick, onDrag }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        border: element.selected ? '2px solid red' : '1px solid #ddd',
        padding: '10px',
        backgroundColor: '#fff',
        cursor: 'move',
      }}
      onClick={onClick}
      draggable
      onDrag={onDrag}
    >
      {element.type === 'Label' && <span>{element.text}</span>}
      {element.type === 'Input' && <input type="text" placeholder={element.text} />}
      {element.type === 'Button' && <button>{element.text}</button>}
    </div>
  );
};

export default Element;
