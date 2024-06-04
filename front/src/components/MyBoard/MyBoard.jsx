import { Stage, Layer, Rect, Circle, Star, Text } from 'react-konva';
import { useStageScale } from '../../hooks/useStageScale';
import Rectangle from '../../shapes/Rectangle';
import { useEffect, useRef, useState } from 'react';
import './style.scss';
import CustomCircle from '../../shapes/Circle';
import FiveStar from '../../shapes/FiveStar';
import CustomText from '../../shapes/CustomText';
import CustomImage from '../../shapes/CustomImage';
import ToolsItem from '../ToolsItem/ToolsItem';

const MyBoard = ({ shapes, setShapes }) => {
  const { onWheel, stagePos, stageScale } = useStageScale();
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  const [selectedShape, setSelectedShape] = useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  };


  const onShapeTransform = (newAttrs, i) => {
    const tempShapes = shapes.slice();
    tempShapes[i] = newAttrs;
    setShapes(tempShapes);
    setSelectedShape(tempShapes[i]);
  }

  return (
    <div className='board-wrapper'>
      <ToolsItem
        selectedShape={selectedShape}
        onChange={(newAttrs) => {
          const tempShapes = shapes.slice();
          //const i = tempShapes.filter(item => item.id === selectedShape.id);
          const chosenItem = tempShapes.filter(item => item.id === selectedShape.id)[0];
          const i = tempShapes.indexOf(chosenItem)
          tempShapes[i] = newAttrs;
          setShapes(tempShapes);
        }} />
      <Stage
        ref={stageRef}
        {...stagePos}
        className='board'
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        width={window.innerWidth - 500}
        height={window.innerHeight}
        draggable
        onWheel={onWheel}
        scale={{ x: stageScale, y: stageScale }}
      >
        <Layer ref={layerRef}>
          {shapes.map((shape, i) => {
            if (shape.type === "rect") {
              return (
                <Rectangle
                  key={i}
                  shapeProps={shape}
                  isSelected={selectedShape !== null && shape.id === selectedShape.id}
                  onSelect={() => {
                    setSelectedShape(shape);
                  }}
                  onChange={(newAttrs) => onShapeTransform(newAttrs, i)}
                />
              );
            }
            if (shape.type === "circle") {
              return (
                <CustomCircle
                  key={i}
                  shapeProps={shape}
                  isSelected={selectedShape !== null && shape.id === selectedShape.id}
                  onSelect={() => {
                    setSelectedShape(shape);
                  }}
                  onChange={(newAttrs) => onShapeTransform(newAttrs, i)}
                />
              );
            }

            if (shape.type === "star") {
              return (
                <FiveStar
                  key={i}
                  shapeProps={shape}
                  isSelected={selectedShape !== null && shape.id === selectedShape.id}
                  onSelect={() => {
                    setSelectedShape(shape);
                  }}
                  onChange={(newAttrs) => onShapeTransform(newAttrs, i)}
                />
              );
            }

            if (shape.type === "text") {
              return (
                <CustomText
                  layerRef={layerRef}
                  stageRef={stageRef}
                  key={i}
                  textProps={shape}
                  isSelected={selectedShape !== null && shape.id === selectedShape.id}
                  onSelect={() => {
                    setSelectedShape(shape);
                  }}
                  onChange={(newAttrs) => onShapeTransform(newAttrs, i)}
                />
              );
            }

            if (shape.type === "image") {
              return (
                <CustomImage
                  key={i}
                  shapeProps={shape}
                  isSelected={selectedShape !== null && shape.id === selectedShape.id}
                  onSelect={() => {
                    setSelectedShape(shape);
                  }}
                  onChange={(newAttrs) => onShapeTransform(newAttrs, i)}
                />
              );
            }

          })}
        </Layer>
      </Stage>
    </div>
  )
}

export default MyBoard;