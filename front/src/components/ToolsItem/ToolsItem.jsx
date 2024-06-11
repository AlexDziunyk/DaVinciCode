import ShapesToolbar from './components/ShapesToolbar';
import TextToolbar from './components/TextToolbar';
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import './style.scss';


const ToolsItem = ({ selectedShape, onChange, moveHigher, moveLower }) => {

  return (
    <div className='tools__container'>
      <div className='tools-item'>
        {selectedShape && <div className='items'>
          {selectedShape.type !== "text" && <ShapesToolbar selectedShape={selectedShape} onChange={onChange} />}
          {selectedShape.type === "text" && <TextToolbar selectedShape={selectedShape} onChange={onChange} />}
          <div onClick={() => moveHigher(selectedShape)} className='icon-box'><FaLongArrowAltUp /></div>
          <div onClick={() => moveLower(selectedShape)} className='icon-box'><FaLongArrowAltDown /></div>
        </div>}
      </div>
    </div>
  )
}

export default ToolsItem;