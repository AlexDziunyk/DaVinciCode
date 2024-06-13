import Toolbar from '../../components/Toolbar/Toolbar';
import MyBoard from '../../components/MyBoard/MyBoard';
import useShapes from '../../hooks/useShapes';
import { useEffect } from 'react';
import axios from '../../axios/axios'
import './style.scss';

const Scene = () => {
  const [shapes, setShapes] = useShapes();

  useEffect(() => {
    const fetchShapes = async () => {
      const { data } = await axios.get("/user/shapes");

      setShapes(data.shapes ?? []);
    };

    fetchShapes();
  }, []);

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