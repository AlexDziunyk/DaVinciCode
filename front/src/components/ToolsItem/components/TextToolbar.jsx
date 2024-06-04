import React, { useEffect, useState } from 'react';
import './toolbars.scss';
import { HexColorPicker } from 'react-colorful';
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { FaAlignLeft } from "react-icons/fa6";
import { FaAlignRight } from "react-icons/fa6";
import { FaAlignCenter } from "react-icons/fa6";

const TextToolbar = ({ selectedShape, onChange }) => {

  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#aabbcc");
  const [isTextColorActive, setIsTextColorActive] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalics, setIsItalics] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLineThrough, setIsLineThrough] = useState(false);
  const [textAlign, setTextAlign] = useState("center");

  useEffect(() => {
    setIsTextColorActive(false);
    setIsBold(false);
    setIsItalics(false);
    setIsUnderline(false);
    setIsLineThrough(false);

    if (selectedShape) {
      setFontSize(selectedShape.fontSize);
      setTextColor(selectedShape.fill);
      setTextAlign(selectedShape.align);

      const fontStyleString = selectedShape.fontStyle;

      setIsBold(fontStyleString.includes("bold") ? true : false);
      setIsItalics(fontStyleString.includes("italic") ? true : false);

      const textDecoration = selectedShape.textDecoration;

      setIsLineThrough(textDecoration.includes("line-through") ? true : false);
      setIsUnderline(textDecoration.includes("underline") ? true : false);


    }
  }, [selectedShape]);


  useEffect(() => {
    const bold = isBold ? "bold" : "";
    const italics = isItalics ? "italic" : "";

    const underline = isUnderline ? "underline" : "";
    const lineThrough = isLineThrough ? "line-through" : "";

    onChange({
      ...selectedShape,
      fill: textColor,
      fontSize: fontSize,
      fontStyle: `${bold} ${italics}`,
      textDecoration: `${underline}${lineThrough}`,
      align: textAlign
    });

  }, [isBold, isItalics, fontSize, textColor, isUnderline, isLineThrough, textAlign]);

  return (
    <div className='items'>
      <div className='font-size'>
        <button onClick={() => {
          if (fontSize <= 2) {
            setFontSize(2);
          } else {
            setFontSize(prev => prev - 2);
          }
        }}>-</button>
        <input onBlur={(e) => {
          const newValue = e.target.value
          if (newValue <= 2) {
            setFontSize(2);
          } else if (newValue >= 200) {
            setFontSize(200);
          }
        }} min={2} max={200} value={fontSize} onChange={(e) => {
          const newValue = e.target.value;
          setFontSize(newValue);
        }}></input>
        <button onClick={() => {
          if (fontSize >= 200) {
            setFontSize(2);
          } else {
            setFontSize(prev => prev + 2);
          }

        }}>+</button>
      </div>
      <div onClick={() => setIsTextColorActive(true)} className='color-box' style={{ backgroundColor: textColor }}></div>
      {isTextColorActive && <div className='color-picker'>
        <HexColorPicker color={textColor} onChange={(newColor) => {
          setTextColor(newColor);
        }} />
      </div>}
      <div onClick={() => setIsBold(prev => !prev)} className={`icon-box ${isBold ? "chosen" : ""}`}>
        <FaBold />
      </div>
      <div onClick={() => setIsItalics(prev => !prev)} className={`icon-box ${isItalics ? "chosen" : ""}`}>
        <FaItalic />
      </div>
      <div onClick={() => {
        setIsUnderline(prev => !prev);
        setIsLineThrough(false);
      }} className={`icon-box ${isUnderline ? "chosen" : ""}`}>
        <FaUnderline />
      </div>
      <div onClick={() => {
        setIsLineThrough(prev => !prev);
        setIsUnderline(false);
      }} className={`icon-box ${isLineThrough ? "chosen" : ""}`}>
        <AiOutlineStrikethrough size={16} />
      </div>
      <div onClick={() => {
        if (textAlign === "left") {
          setTextAlign("center");
        } else if (textAlign === "center") {
          setTextAlign("right");
        } else {
          setTextAlign("left");
        }
      }} className='icon-box'>
        {textAlign === "left" && <FaAlignLeft />}
        {textAlign === "center" && <FaAlignCenter />}
        {textAlign === "right" && <FaAlignRight />}
      </div>

    </div>
  )
}

export default TextToolbar