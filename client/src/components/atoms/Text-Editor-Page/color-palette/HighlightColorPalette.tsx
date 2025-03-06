import React, {  useContext, useEffect, useRef } from 'react';
import { Done} from "@mui/icons-material";
import { RichUtils } from 'draft-js';
import { EditorContext } from '../../../../context/editor-context';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentStateType, setHighlightColorPaletteCurrentColor, setIsHighlightColorPaletteOpen } from '../../../../redux/Slices/componentSlice';



const HighlightColorPalette = () => {

    const { editorState, setEditorState} = useContext(EditorContext);
    const { colorPaletteCurrentColor, highlightColorPaletteCurrentColor} = useSelector( (state:{ component:ComponentStateType})=>state.component );
    const dispatch = useDispatch();

// colors list
const highlightColorsList = [
    { color: "highlightRed", label: "RED", colorValue: 'rgba(255, 0, 0, 1.0)' },
    { color: "highlightOrange", label: "ORANGE", colorValue: 'rgba(255, 127, 0, 1.0)' },
    { color: "highlightYellow", label: "YELLOW", colorValue: 'rgba(180, 180, 0, 1.0)' },
    { color: "highlightGreen", label: "GREEN", colorValue: 'rgba(0, 180, 0, 1.0)' },
    { color: "highlightBlue", label: "BLUE", colorValue: 'rgba(0, 0, 255, 1.0)' },
    { color: "highlightIndigo", label: "INDIGO", colorValue: 'rgba(75, 0, 130, 1.0)' },
    { color: "highlightViolet", label: "VIOLET", colorValue: 'rgba(127, 0, 255, 1.0)' },
    { color: "highlightPink", label: "PINK", colorValue: 'rgba(255, 192, 203, 1.0)' },
    { color: "highlightBrown", label: "BROWN", colorValue: 'rgba(165, 42, 42, 1.0)' },
    { color: "highlightGray", label: "GRAY", colorValue: 'rgba(128, 128, 128, 1.0)' },
    { color: "highlightBlack", label: "BLACK", colorValue: 'rgba(0, 0, 0, 1.0)' },
    { color: "highlightWhite", label: "WHITE", colorValue: 'rgba(255, 255, 255, 1.0)' },
    { color: "highlightCyan", label: "CYAN", colorValue: 'rgba(0, 255, 255, 1.0)' },
    { color: "highlightMagenta", label: "MAGENTA", colorValue: 'rgba(255, 0, 255, 1.0)' },
    { color: "highlightLime", label: "LIME", colorValue: 'rgba(0, 255, 0, 1.0)' },
    { color: "highlightOlive", label: "OLIVE", colorValue: 'rgba(128, 128, 0, 1.0)' },
    { color: "highlightTeal", label: "TEAL", colorValue: 'rgba(0, 128, 128, 1.0)' },
    { color: "highlightNavy", label: "NAVY", colorValue: 'rgba(0, 0, 128, 1.0)' },
    { color: "highlightMaroon", label: "MAROON", colorValue: 'rgba(128, 0, 0, 1.0)' },
    { color: "highlightCoral", label: "CORAL", colorValue: 'rgba(255, 127, 80, 1.0)' },
    { color: "highlightSalmon", label: "SALMON", colorValue: 'rgba(250, 128, 114, 1.0)' },
    { color: "highlightGold", label: "GOLD", colorValue: 'rgba(255, 215, 0, 1.0)' },
    { color: "highlightSilver", label: "SILVER", colorValue: 'rgba(192, 192, 192, 1.0)' },
    { color: "highlightLavender", label: "LAVENDER", colorValue: 'rgba(230, 230, 250, 1.0)' },
    { color: "highlightPeach", label: "PEACH", colorValue: 'rgba(255, 218, 185, 1.0)' },
    { color: "highlightMint", label: "MINT", colorValue: 'rgba(189, 252, 201, 1.0)' },
    { color: "highlightKhaki", label: "KHAKI", colorValue: 'rgba(240, 230, 140, 1.0)' },
    { color: "highlightPlum", label: "PLUM", colorValue: 'rgba(221, 160, 221, 1.0)' },
    { color: "highlightChocolate", label: "CHOCOLATE", colorValue: 'rgba(210, 105, 30, 1.0)' },
    { color: "highlightSienna", label: "SIENNA", colorValue: 'rgba(160, 82, 45, 1.0)' },
    { color: "highlightBisque", label: "BISQUE", colorValue: 'rgba(255, 228, 196, 1.0)' },
    { color: "highlightLavenderblush", label: "LAVENDERBLUSH", colorValue: 'rgba(255, 240, 245, 1.0)' },
    { color: "highlightAntiquewhite", label: "ANTIQUEWHITE", colorValue: 'rgba(250, 235, 215, 1.0)' },
    { color: "highlightLightblue", label: "LIGHTBLUE", colorValue: 'rgba(173, 216, 230, 1.0)' },
    { color: "highlightLightgreen", label: "LIGHTGREEN", colorValue: 'rgba(144, 238, 144, 1.0)' },
    { color: "highlightLightcoral", label: "LIGHTCORAL", colorValue: 'rgba(240, 128, 128, 1.0)' },
    { color: "highlightLightpink", label: "LIGHTPINK", colorValue: 'rgba(255, 182, 193, 1.0)' },
    { color: "highlightLightsalmon", label: "LIGHTSALMON", colorValue: 'rgba(255, 160, 122, 1.0)' },
    { color: "highlightLightyellow", label: "LIGHTYELLOW", colorValue: 'rgba(255, 255, 224, 1.0)' },
    { color: "highlightLightgray", label: "LIGHTGRAY", colorValue: 'rgba(211, 211, 211, 1.0)' },
    { color: "highlightDarkred", label: "DARKRED", colorValue: 'rgba(139, 0, 0, 1.0)' },
    { color: "highlightDarkgreen", label: "DARKGREEN", colorValue: 'rgba(0, 100, 0, 1.0)' },
    { color: "highlightDarkblue", label: "DARKBLUE", colorValue: 'rgba(0, 0, 139, 1.0)' },
    { color: "highlightDarkviolet", label: "DARKVIOLET", colorValue: 'rgba(148, 0, 211, 1.0)' },
    { color: "highlightDarkorange", label: "DARKORANGE", colorValue: "rgba(255, 140, 0, 1.0)" },
    { color: "highlightDarksky", label: "DARKSKY", colorValue: "rgb(16, 143, 158)" },
    { color: "highlightLavendermix", label: "LAVENDERMIX", colorValue: 'rgba(230, 230, 250, 1.0)' },
    { color: "highlightTurquoise", label: "TURQUOISE", colorValue: 'rgba(64, 224, 208, 1.0)' },
    { color: "highlightFuchsia", label: "FUCHSIA", colorValue: 'rgba(212, 120, 225, 1.0)' },
    { color: "highlightChartreuse", label: "CHARTREUSE", colorValue: 'rgba(127, 255, 0, 1.0)' },

];

const handleHighlightChangeTextColor = ( selectedColor:string)=>{

    const newState = RichUtils.toggleInlineStyle( editorState, selectedColor);
    setEditorState(newState);

};



  return (
    <div className='bg-red-700 p-2 rounded-lg w-[240px] flex flex-wrap bg-white shadow-lg z-[11] relative'>
        {
            highlightColorsList.map((colorItem)=>{
                return ( 
                    <div 
                        className={` w-6 h-6 rounded-full m-[1.6px] shadow-md shadow-gray-300 hover:shadow-md hover:shadow-gray-500 cursor-pointer flex justify-center items-center`} 
                        style={{backgroundColor:colorItem.colorValue,}}
                        onClick={()=>{ 
                            handleHighlightChangeTextColor(colorItem.color);
                            dispatch( setHighlightColorPaletteCurrentColor(colorItem.color))
                        }}
                    >
                        { highlightColorPaletteCurrentColor===colorItem.color && <Done sx={{color: colorItem.color==="white" ? "black" : "white" , borderRadius:"50%", fontSize:"18px"}}/>}
                    </div>
                )
            })
        }
        <div style={{backgroundColor:"rgb(16, 143, 158)"}}>

        </div>
    </div>
  )
}

export default HighlightColorPalette;