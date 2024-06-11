import Toolbar from '../../components/Toolbar/Toolbar';
import MyBoard from '../../components/MyBoard/MyBoard';
import useShapes from '../../hooks/useShapes'; 
import './style.scss';

const Scene = () => {
  const [shapes, setShapes] = useShapes();

  const addShape = (newShape) => {
    setShapes([...shapes, newShape]);
  };

  return (
    <div className='scene'>
      <Toolbar shapes={shapes} setShapes={setShapes} />
      <MyBoard shapes={shapes} setShapes={setShapes} />
    </div>
  )
}

export default Scene;