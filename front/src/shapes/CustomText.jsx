import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';

const CustomText = ({layerRef, stageRef}) => {
  // const stageRef = useRef(null);
  // const layerRef = useRef(null);
  const textNodeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    const textNode = textNodeRef.current;
    const transformer = trRef.current;
    layerRef.current.add(textNode);
    layerRef.current.add(transformer);
    transformer.attachTo(textNode);
    layerRef.current.batchDraw();

    const handleTransform = () => {
      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        scaleX: 1,
      });
    };

    textNode.on('transform', handleTransform);

    const handleDblClick = () => {
      textNode.hide();
      transformer.hide();

      const textPosition = textNode.absolutePosition();
      const areaPosition = {
        x: stageRef.current.container().offsetLeft + textPosition.x,
        y: stageRef.current.container().offsetTop + textPosition.y,
      };

      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
      textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
      textarea.style.fontSize = textNode.fontSize() + 'px';
      textarea.style.border = 'none';
      textarea.style.padding = '0px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.lineHeight = textNode.lineHeight();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = 'left top';
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      let transform = '';
      const rotation = textNode.rotation();
      if (rotation) {
        transform += `rotateZ(${rotation}deg)`;
      }

      let px = 0;
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20);
      }
      transform += `translateY(-${px}px)`;

      textarea.style.transform = transform;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 3}px`;
      textarea.focus();

      const removeTextarea = () => {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        textNode.show();
        transformer.show();
        transformer.forceUpdate();
      };

      const setTextareaWidth = (newWidth) => {
        if (!newWidth) {
          newWidth = textNode.placeholder.length * textNode.fontSize();
        }
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth);
        }
        const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
          newWidth += 1;
        }
        textarea.style.width = `${newWidth}px`;
      };

      textarea.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          textNode.text(textarea.value);
          removeTextarea();
        }
        if (e.keyCode === 27) {
          removeTextarea();
        }
      });

      textarea.addEventListener('keydown', (e) => {
        const scale = textNode.getAbsoluteScale().x;
        setTextareaWidth(textNode.width() * scale);
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + textNode.fontSize()}px`;
      });

      const handleOutsideClick = (e) => {
        if (e.target !== textarea) {
          textNode.text(textarea.value);
          removeTextarea();
        }
      };
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      });
    };

    textNode.on('dblclick dbltap', handleDblClick);

    return () => {
      textNode.off('transform', handleTransform);
      textNode.off('dblclick dbltap', handleDblClick);
    };
  }, []);

  return (
    <>
      <Text
        ref={textNodeRef}
        text="Some text here"
        x={50}
        y={80}
        fontSize={20}
        draggable
        width={200}
      />
      <Transformer
        ref={trRef}
        enabledAnchors={['middle-left', 'middle-right']}
        boundBoxFunc={(oldBox, newBox) => {
          newBox.width = Math.max(30, newBox.width);
          return newBox;
        }}
      />
    </>
  );
};

export default CustomText;
