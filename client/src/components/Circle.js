import React from 'react';

const Circle = ({ radius = 9, strokeWidth = 2, percentage = "-", color1 = '#ccc8c8', color2 = '#ccc8c8' }) => {
  const totalCircumference = 2 * Math.PI * radius;
  const filledLength = (75 / 100) * totalCircumference;

  return (
    <div style={{ position: "relative", width: `${radius * 2.6}px`, height: `${radius * 2.6}px`,borderRadius: '50%', }}>
      <svg width="100%" height="100%">
        <circle 
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke={color2} 
          fill="none" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeDasharray={`${totalCircumference}, ${totalCircumference}`}
        />
        <circle 
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke={color1} 
          fill="none" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeDasharray={`${filledLength}, ${totalCircumference}`}
        />
      </svg>
      <div id="circle-percentage" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "10px",
          textAlign: "center"
        }}>
        <span>{percentage}</span>
      </div>
    </div>
  );
};

export default Circle;
