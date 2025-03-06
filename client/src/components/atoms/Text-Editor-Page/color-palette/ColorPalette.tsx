import React, {  useContext, useEffect, useRef } from 'react';
import { Done} from "@mui/icons-material";
import { RichUtils } from 'draft-js';
import { EditorContext } from '../../../../context/editor-context';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentStateType, setColorPaletteCurrentColor, setIsColorPaletteOpen } from '../../../../redux/Slices/componentSlice';



const ColorPalette = () => {

    const { editorState, setEditorState} = useContext(EditorContext);
    const { colorPaletteCurrentColor} = useSelector( (state:{ component:ComponentStateType})=>state.component );
    const dispatch = useDispatch();

// colors list
const colorsList = [
    { color: "red", label: "RED", colorValue: 'rgba(255, 0, 0, 1.0)' },
    { color: "orange", label: "ORANGE", colorValue: 'rgba(255, 127, 0, 1.0)' },
    { color: "yellow", label: "YELLOW", colorValue: 'rgba(180, 180, 0, 1.0)' },
    { color: "green", label: "GREEN", colorValue: 'rgba(0, 180, 0, 1.0)' },
    { color: "blue", label: "BLUE", colorValue: 'rgba(0, 0, 255, 1.0)' },
    { color: "indigo", label: "INDIGO", colorValue: 'rgba(75, 0, 130, 1.0)' },
    { color: "violet", label: "VIOLET", colorValue: 'rgba(127, 0, 255, 1.0)' },
    { color: "pink", label: "PINK", colorValue: 'rgba(255, 192, 203, 1.0)' },
    { color: "brown", label: "BROWN", colorValue: 'rgba(165, 42, 42, 1.0)' },
    { color: "gray", label: "GRAY", colorValue: 'rgba(128, 128, 128, 1.0)' },
    { color: "black", label: "BLACK", colorValue: 'rgba(0, 0, 0, 1.0)' },
    { color: "white", label: "WHITE", colorValue: 'rgba(255, 255, 255, 1.0)' },
    { color: "cyan", label: "CYAN", colorValue: 'rgba(0, 255, 255, 1.0)' },
    { color: "magenta", label: "MAGENTA", colorValue: 'rgba(255, 0, 255, 1.0)' },
    { color: "lime", label: "LIME", colorValue: 'rgba(0, 255, 0, 1.0)' },
    { color: "olive", label: "OLIVE", colorValue: 'rgba(128, 128, 0, 1.0)' },
    { color: "teal", label: "TEAL", colorValue: 'rgba(0, 128, 128, 1.0)' },
    { color: "navy", label: "NAVY", colorValue: 'rgba(0, 0, 128, 1.0)' },
    { color: "maroon", label: "MAROON", colorValue: 'rgba(128, 0, 0, 1.0)' },
    { color: "coral", label: "CORAL", colorValue: 'rgba(255, 127, 80, 1.0)' },
    { color: "salmon", label: "SALMON", colorValue: 'rgba(250, 128, 114, 1.0)' },
    { color: "gold", label: "GOLD", colorValue: 'rgba(255, 215, 0, 1.0)' },
    { color: "silver", label: "SILVER", colorValue: 'rgba(192, 192, 192, 1.0)' },
    { color: "lavender", label: "LAVENDER", colorValue: 'rgba(230, 230, 250, 1.0)' },
    { color: "peach", label: "PEACH", colorValue: 'rgba(255, 218, 185, 1.0)' },
    { color: "mint", label: "MINT", colorValue: 'rgba(189, 252, 201, 1.0)' },
    { color: "khaki", label: "KHAKI", colorValue: 'rgba(240, 230, 140, 1.0)' },
    { color: "plum", label: "PLUM", colorValue: 'rgba(221, 160, 221, 1.0)' },
    { color: "chocolate", label: "CHOCOLATE", colorValue: 'rgba(210, 105, 30, 1.0)' },
    { color: "sienna", label: "SIENNA", colorValue: 'rgba(160, 82, 45, 1.0)' },
    { color: "bisque", label: "BISQUE", colorValue: 'rgba(255, 228, 196, 1.0)' },
    { color: "lavenderblush", label: "LAVENDERBLUSH", colorValue: 'rgba(255, 240, 245, 1.0)' },
    { color: "antiquewhite", label: "ANTIQUEWHITE", colorValue: 'rgba(250, 235, 215, 1.0)' },
    { color: "lightblue", label: "LIGHTBLUE", colorValue: 'rgba(173, 216, 230, 1.0)' },
    { color: "lightgreen", label: "LIGHTGREEN", colorValue: 'rgba(144, 238, 144, 1.0)' },
    { color: "lightcoral", label: "LIGHTCORAL", colorValue: 'rgba(240, 128, 128, 1.0)' },
    { color: "lightpink", label: "LIGHTPINK", colorValue: 'rgba(255, 182, 193, 1.0)' },
    { color: "lightsalmon", label: "LIGHTSALMON", colorValue: 'rgba(255, 160, 122, 1.0)' },
    { color: "lightyellow", label: "LIGHTYELLOW", colorValue: 'rgba(255, 255, 224, 1.0)' },
    { color: "lightgray", label: "LIGHTGRAY", colorValue: 'rgba(211, 211, 211, 1.0)' },
    { color: "darkred", label: "DARKRED", colorValue: 'rgba(139, 0, 0, 1.0)' },
    { color: "darkgreen", label: "DARKGREEN", colorValue: 'rgba(0, 100, 0, 1.0)' },
    { color: "darkblue", label: "DARKBLUE", colorValue: 'rgba(0, 0, 139, 1.0)' },
    { color: "darkviolet", label: "DARKVIOLET", colorValue: 'rgba(148, 0, 211, 1.0)' },
    { color: "darkorange", label: "DARKORANGE", colorValue: "rgba(255, 140, 0, 1.0)" },
    { color: "darksky", label: "DARKSKY", colorValue: "rgb(16, 143, 158)" },
    { color: "lavendermix", label: "LAVENDERMIX", colorValue: 'rgba(230, 230, 250, 1.0)' },
    { color: "turquoise", label: "TURQUOISE", colorValue: 'rgba(64, 224, 208, 1.0)' },
    { color: "fuchsia", label: "FUCHSIA", colorValue: 'rgba(212, 120, 225, 1.0)' },
    { color: "chartreuse", label: "CHARTREUSE", colorValue: 'rgba(127, 255, 0, 1.0)' },

];

const handleChangeTextColor = ( selectedColor:string)=>{

    const newState = RichUtils.toggleInlineStyle( editorState, selectedColor);
    setEditorState(newState);

};



  return (
    <div className=' p-2 rounded-lg w-[240px] flex flex-wrap bg-white shadow-lg z-[11] relative'>
        {
            colorsList.map((colorItem)=>{
                return ( 
                    <div 
                        className={` w-6 h-6 rounded-full m-[1.6px] shadow-md shadow-gray-300 hover:shadow-md hover:shadow-gray-500 cursor-pointer flex justify-center items-center`} 
                        style={{backgroundColor:colorItem.colorValue,}}
                        onClick={()=>{ 
                            handleChangeTextColor(colorItem.color);
                            dispatch( setColorPaletteCurrentColor(colorItem.color))
                        }}
                    >
                        { colorPaletteCurrentColor===colorItem.color && <Done sx={{color: colorItem.color==="white" ? "black" : "white" , borderRadius:"50%", fontSize:"18px"}}/>}
                    </div>
                )
            })
        }
        <div style={{backgroundColor:"rgb(16, 143, 158)"}}>

        </div>
    </div>
  )
}

export default ColorPalette;