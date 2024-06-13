import Toolbar from '../../components/Toolbar/Toolbar';
import MyBoard from '../../components/MyBoard/MyBoard';
import { useState } from 'react';
import './style.scss';
import Popup from '../../components/Popup/Popup';

const Scene = () => {
  const [shapes, setShapes] = useState([]);


  return (
    <div className='scene'>
      <Toolbar shapes={shapes} setShapes={setShapes} />
      <MyBoard shapes={shapes} setShapes={setShapes} />
      
    </div>
  )
}

export default Scene;