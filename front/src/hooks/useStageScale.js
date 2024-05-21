import { useState } from "react";

export const useStageScale = () => {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);

  const getLimitedScale = (currScale, min, max) => {
    return Math.max(min, Math.min(max, currScale));
  }

  const onWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const scaleBorder = { min: 0.1, max: 2 };

    const stage = e.target.getStage();
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointerPosition = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointerPosition.x - stage.x()) / oldScale,
      y: (pointerPosition.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    const finalScale = getLimitedScale(newScale, scaleBorder.min, scaleBorder.max);
    setStageScale(finalScale);
    setStagePos({
      x: pointerPosition.x - mousePointTo.x * finalScale,
      y: pointerPosition.y - mousePointTo.y * finalScale,
    });
  }

  return { onWheel, stagePos, stageScale };
}