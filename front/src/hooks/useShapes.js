import { useState, useEffect } from 'react';
import axios from '../axios/axios'

const useShapes = (id) => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    console.log('Shapes changed:', shapes); 
    
    saveShapes(shapes, id);

  }, [shapes]);

  return [shapes, setShapes];
};

async function saveShapes(shapes, id){
  const response = await axios.post(`/user/shapes/${id}`, { shapes });
}

export default useShapes;
