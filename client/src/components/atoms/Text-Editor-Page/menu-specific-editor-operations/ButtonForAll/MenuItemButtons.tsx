import { MouseEventHandler } from "react";

const MenuItemsButton = ( {item, onClickHandler}:{ item: string, onClickHandler: MouseEventHandler<HTMLDivElement>})=>{
    return(
      <div 
          className="px-4 py-1 hover:bg-gray-200 cursor-pointer" 
          onClick={onClickHandler}
      >
        { item}
      </div>
    )
  }

export { MenuItemsButton};