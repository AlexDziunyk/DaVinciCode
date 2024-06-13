import React, { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import Slider from '@mui/material/Slider';
import borders from '../../../assets/borders.svg';
import './toolbars.scss';

const ImagesToolbar = ({ selectedShape, onChange }) => {

  const [strokeColor, setStrokeColor] = useState(selectedShape ? selectedShape.stroke : "#aabbcc");
  const [isBorderActive, setIsBorderActive] = useState(false);
  const [isColorStrokeActive, setIsColorStrokeActive] = useState(false);
  const [radiusValue, setRadiusValue] = useState(0);
  const [strokeValue, setStrokeValue] = useState(0);

  useEffect(() => {
    setIsBorderActive(false);
    setIsColorStrokeActive(false);
    if (selectedShape) {
      setStrokeColor(selectedShape.stroke);
      setRadiusValue(selectedShape.cornerRadius);
      setStrokeValue(selectedShape.strokeWidth);
    }
  }, [selectedShape]);

  return (
    <>

      <img onClick={() => setIsBorderActive(true)} src={borders} alt='borders' style={{ cursor: "pointer" }}></img>

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
    </>
  )
}

export default ImagesToolbar;