import { v4 as uuidv4 } from 'uuid';

export const shapesObj = {
  rect: {
    type: "rect",
    x: (window.innerWidth - 500) / 2,
    y: window.innerHeight / 2,
    width: 50,
    height: 50,
    fill: 'red',
    id: uuidv4(),
  },
  circle: {
    type: "circle",
    x: (window.innerWidth - 500) / 2,
    y: window.innerHeight / 2,
    width: 50,
    height: 50,
    //radius: 50,
    fill: 'red',
    id: uuidv4(),
  },
  star: {
    type: "star",
    x: (window.innerWidth - 500) / 2,
    y: window.innerHeight / 2,
    numPoints: 5,
    innerRadius: 10,
    outerRadius: 10,
    width: 50,
    height: 50,
    fill: 'red',
    id: uuidv4(),
  },
  text: {
    type: "text",
    fill: 'red',
    x: (window.innerWidth - 500) / 2,
    y: window.innerHeight / 2,
    text: "New Text",
    id: uuidv4(),
  },
  image: {
    type: "image",
    url: "",
    x: (window.innerWidth - 500) / 2,
    y: window.innerHeight / 2,

  }
}