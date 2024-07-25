import React from 'react';

const Sidebar = ({ onDragStart }) => {
  return (
    <div className="sidebar">
      <div draggable onDragStart={(e) => onDragStart(e, 'Label')}>Label</div>
      <div draggable onDragStart={(e) => onDragStart(e, 'Input')}>Input</div>
      <div draggable onDragStart={(e) => onDragStart(e, 'Button')}>Button</div>
    </div>
  );
};

export default Sidebar;
