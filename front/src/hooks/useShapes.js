import { useState, useEffect } from 'react';
import axios from '../axios/axios'

const useShapes = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    console.log('Shapes changed:', shapes); 
    
    saveShapes(shapes);

  }, [shapes]);

  return [shapes, setShapes];
};

async function saveShapes(shapes){
  const response = await axios.post("/user/shapes", { shapes });
}

export default useShapes;
