import React from 'react';
import { Rect } from 'react-konva';

const DottedBackground = ({ width, height, offsetX, offsetY }) => {
  const spacing = 20; // spacing between dots
  const dotSize = 2; // size of the dots


  const createDotPattern = (dotSize, spacing) => {
    const canvas = document.createElement('canvas');
    canvas.width = spacing;
    canvas.height = spacing;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(dotSize / 2, dotSize / 2, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();
    return canvas;
  };

  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fillPatternImage={createDotPattern(dotSize, spacing)}
      fillPatternRepeat="repeat"
      fillPatternOffset={{ x: offsetX % spacing, y: offsetY % spacing }}
    />
  );
};

export default DottedBackground;


