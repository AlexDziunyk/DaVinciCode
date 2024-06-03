import { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import Slider from '@mui/material/Slider';
import './style.scss';

const ToolsItem = ({ selectedShape, onChange }) => {
  const [color, setColor] = useState(selectedShape ? selectedShape.fill : "#aabbcc");
  const [strokeColor, setStrokeColor] = useState(selectedShape ? selectedShape.stroke : "#aabbcc");
  const [isColorActive, setIsColorActive] = useState(false);
  const [isBorderActive, setIsBorderActive] = useState(false);
  const [isColorStrokeActive, setIsColorStrokeActive] = useState(false);
  const [radiusValue, setRadiusValue] = useState(0);
  const [strokeValue, setStrokeValue] = useState(0);

  useEffect(() => {
    setIsColorActive(false);
    setIsBorderActive(false);
    setIsColorStrokeActive(false);
    if (selectedShape) {
      setColor(selectedShape.fill);
      setStrokeColor(selectedShape.stroke);
    }
  }, [selectedShape]);

  return (
    <div className='tools-item'>
      {selectedShape && <div className='items'>
        <div onClick={() => setIsColorActive(true)} className='color-box' style={{ backgroundColor: color }}></div>
        {isColorActive && <div className='color-picker'>
          <HexColorPicker color={color} onChange={(newColor) => {
            setColor(newColor);
            onChange({ ...selectedShape, fill: newColor })
          }} />
        </div>}
        <div onClick={() => setIsBorderActive(true)} className='border-box'></div>
        {isBorderActive && <div className='border__container'>
          <div className='sliders'>
            <p className='slider__title'>Border Radius</p>
            <div className='border__slider'>
              <Slider value={radiusValue} onChange={(e, newValue) => {
                setRadiusValue(newValue);
                onChange({ ...selectedShape, cornerRadius: newValue, strokeWidth: strokeValue });
              }} />
              <input className='slider__value' readOnly value={radiusValue} onChange={(e) => setRadiusValue(e.target.value)}></input>
            </div>
            <p className='slider__title'>Stroke Size</p>
            <div className='border__slider'>
              <Slider value={strokeValue} onChange={(e, newValue) => {
                setStrokeValue(newValue);
                onChange({ ...selectedShape, cornerRadius: radiusValue, strokeWidth: newValue });
              }} />
              <input className='slider__value' readOnly value={strokeValue} onChange={(e) => setStrokeValue(e.target.value)}></input>
            </div>
          </div>
        </div>}
        <div onClick={() => setIsColorStrokeActive(true)} className='color-box' style={{ backgroundColor: strokeColor }}></div>
        {isColorStrokeActive && <div className='color-picker'>
          <HexColorPicker color={strokeColor} onChange={(newColor) => {
            setStrokeColor(newColor);
            onChange({ ...selectedShape, stroke: newColor })
          }} />
        </div>}
      </div>}
    </div>
  )
}

export default ToolsItem;