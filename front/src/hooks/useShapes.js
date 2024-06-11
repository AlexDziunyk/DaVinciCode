import { useState, useEffect } from 'react';

const useShapes = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    console.log('Shapes changed:', shapes);
    
  }, [shapes]);

  return [shapes, setShapes];
};

export default useShapes;
