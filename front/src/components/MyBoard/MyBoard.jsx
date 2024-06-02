import { Stage, Layer, Rect, Circle, Star, Text } from 'react-konva';
import { useStageScale } from '../../hooks/useStageScale';
import Rectangle from '../../shapes/Rectangle';
import { useRef, useState } from 'react';
import './style.scss';
import CustomCircle from '../../shapes/Circle';
import FiveStar from '../../shapes/FiveStar';
import CustomText from '../../shapes/CustomText';
import CustomImage from '../../shapes/CustomImage';

const MyBoard = ({ shapes, setShapes }) => {
  const { onWheel, stagePos, stageScale } = useStageScale();
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };


  return (
    <div className='board-wrapper'>
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
                  isSelected={shape.id === selectedId}
                  onSelect={() => {
                    selectShape(shape.id);
                  }}
                  onChange={(newAttrs) => {
                    const tempShapes = shapes.slice();
                    tempShapes[i] = newAttrs;
                    setShapes(tempShapes);
                  }}
                />
              );
            }
            if (shape.type === "circle") {
              return (
                <CustomCircle
                  key={i}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => {
                    selectShape(shape.id);
                  }}
                  onChange={(newAttrs) => {
                    const tempShapes = shapes.slice();
                    tempShapes[i] = newAttrs;
                    setShapes(tempShapes);
                  }}
                />
              );
            }

            if (shape.type === "star") {
              return (
                <FiveStar
                  key={i}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => {
                    selectShape(shape.id);
                  }}
                  onChange={(newAttrs) => {
                    const tempShapes = shapes.slice();
                    tempShapes[i] = newAttrs;
                    setShapes(tempShapes);
                  }}
                />
              );
            }

            if (shape.type === "text") {
              return (
                <CustomText
                  layerRef={layerRef}
                  stageRef={stageRef}
                  key={i}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => {
                    console.log(shape.id)
                    selectShape(shape.id);
                  }}
                  onChange={(newAttrs) => {
                    const tempShapes = shapes.slice();
                    tempShapes[i] = newAttrs;
                    setShapes(tempShapes);
                  }}
                />
              );
            }

            if (shape.type === "image") {
              return (
                <CustomImage
                  key={i}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => {
                    selectShape(shape.id);
                  }}
                  onChange={(newAttrs) => {
                    const tempShapes = shapes.slice();
                    tempShapes[i] = newAttrs;
                    setShapes(tempShapes);
                  }}
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