import ShapesToolbar from './components/ShapesToolbar';
import TextToolbar from './components/TextToolbar';
import './style.scss';


const ToolsItem = ({ selectedShape, onChange }) => {

  return (
    <div className='tools-item'>
      {selectedShape && selectedShape.type !== "text" && <ShapesToolbar selectedShape={selectedShape} onChange={onChange} />}
      {selectedShape && selectedShape.type === "text" && <TextToolbar selectedShape={selectedShape} onChange={onChange} />}


    </div>
  )
}

export default ToolsItem;