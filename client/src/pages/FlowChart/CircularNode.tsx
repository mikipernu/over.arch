// CircularNode.tsx
import React from 'react';

interface CircularNodeProps {
  data: {
    label: string;
  };
}

const CircularNode: React.FC<CircularNodeProps> = ({ data }) => {
  return (
    <div style={{
      width: 100,
      height: 100,
      backgroundColor: 'lightblue',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid black',
    }}>
      <div>{data.label}</div>
    </div>
  );
};

export default CircularNode;
