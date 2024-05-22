import { shapesObj } from '../../utils/shapes';
import { v4 as uuidv4 } from 'uuid';
import './style.scss';

const Toolbar = ({ shapes, setShapes }) => {
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const addShape = debounce((type) => {
    const shape = { ...shapesObj[type], id: uuidv4() };;
    // if (type === "rect") {
    //   shape = { ...shapesObj.rect, id: uuidv4() };
    // } else if (type === "circle") {
    //   shape = { ...shapesObj.circle, id: uuidv4() };
    // } else if (type === "star") {
    //   shape = { ...shapesObj.star, id: uuidv4() };
    // } else if (type === "text") {
    //   shape = { ...shapesObj.text, id: uuidv4() };
    // }

    console.log(shape)

    setShapes((prevShapes) => [...prevShapes, shape]);
  }, 50);


  return (
    <div className='toolbar'>
      <div className='toolbar-shapes'>
        <p className='toolbar-title'>Shapes</p>
        <div className='toolbar-items'>
          <h1 onClick={() => addShape("rect")}>Square</h1>
          <h1 onClick={() => addShape("circle")}>Circle</h1>
          <h1 onClick={() => addShape("star")}>Star</h1>
          <h1 onClick={() => addShape("text")}>Text</h1>
        </div>
      </div>
    </div>
  )
}

export default Toolbar