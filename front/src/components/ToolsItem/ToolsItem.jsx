import ShapesToolbar from './components/ShapesToolbar';
import TextToolbar from './components/TextToolbar';
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import './style.scss';
import ImagesToolbar from './components/ImagesToolbar';


const ToolsItem = ({ selectedShape, onChange, moveHigher, moveLower }) => {

  return (
    <>
      {selectedShape && <div className='tools__container'>
        <div className='tools-item'>
          <div className='items'>
            {selectedShape.type === "image" && <ImagesToolbar selectedShape={selectedShape} onChange={onChange} />}
            {(selectedShape.type === "rect" || selectedShape.type === "star" || selectedShape.type === "circle") && <ShapesToolbar selectedShape={selectedShape} onChange={onChange} />}
            {selectedShape.type === "text" && <TextToolbar selectedShape={selectedShape} onChange={onChange} />}
            <div onClick={() => moveHigher(selectedShape)} className='icon-box'><FaLongArrowAltUp /></div>
            <div onClick={() => moveLower(selectedShape)} className='icon-box'><FaLongArrowAltDown /></div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ToolsItem;