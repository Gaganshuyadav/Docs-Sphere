import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean, setCurrentZoomNumber } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { useState } from "react";

const View = ({ idx }: { idx: number }) => {

  const dispatch = useDispatch();
  const [ isZoomDialogOpen, setIsZoomDialogOpen] = useState(false);

  const zoomNum = [ 100, 120, 140, 160, 180, 200];

  return (
    <>
      <MenuDialog
        idx={idx}
        component={(
          <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative">
            {/* zoom  */}
            <div className="relative hidden md:flex">
              <div
                className="px-4 py-1 hover:bg-gray-200 cursor-pointer relative"
                onClick={() => { setIsZoomDialogOpen(!isZoomDialogOpen) }}
              >
                Zoom
              </div>
              {/* zoom dialog */}
              <div className="absolute bg-white left-[70px] -top-2 border-2 rounded">
                {
                  isZoomDialogOpen && (
                    <div>
                      {
                        zoomNum.map( ( num, i) => {
                          return (
                            <div
                              key={i}
                              className="px-8 py-1 hover:bg-gray-200 cursor-pointer"
                              onClick={() => { dispatch( setCurrentZoomNumber(num)) }}
                            >
                              {num}%
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )}
      />
    </>
  )
}

export { View };
