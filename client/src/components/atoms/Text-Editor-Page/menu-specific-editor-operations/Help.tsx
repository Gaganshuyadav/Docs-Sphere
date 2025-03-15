import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import ContentDialog from "./ContentDialog/ContentDialog";
import { useState } from "react";

const Help = ({ idx}:{idx:number}) =>{

  const dispatch = useDispatch();
  const [ isAboutOpen, setIsAboutOpen] = useState(false);

  const handleSetIsOpen = ( isOpen:boolean)=>{
    setIsAboutOpen(isOpen);
  };

    return(
        <>
        <MenuDialog
          idx={idx} 
          component={( 
            <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative" >
              {/* <MenuItemsButton item={"User Guide"} onClickHandler={ ()=>{ dispatch(setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Keyboard Shortcuts"} onClickHandler={ ()=>{ dispatch(setActiveDialogForMenuUseBoolean(false))}} /> */}
              <MenuItemsButton item={"About"} onClickHandler={ ()=>{ setIsAboutOpen(true)}} /> 
              {
                isAboutOpen && (
                  <ContentDialog
                    setFunction={handleSetIsOpen} 
                    component={
                      <div className=" p-4 max-h-[70vh] max-w-[70vw] overflow-y-scroll">
                        <h1 className="font-bold text-xl text-gray-700 mb-2">About</h1>
                        <p className="text-wrap font-semibold text-gray-600">
                           Welcome to Docs-Sphere, a collaborative document editing platform that empowers users to create, edit, and share documents in real-time.
                           Whether you're working on a team project or drafting personal notes, Docs-Sphere provides a rich set of features to enhance your writing experience.
                           it is designed to handle user authentication, document management, document edit with multiple users in real-time, public and private documents, and email verification. 
                           <br/>
                           It utilizes TypeScript for type safety and Sequelize as an ORM for database interactions.
                           The server is structured to handle asynchronous operations gracefully, ensuring a smooth user experience. <br/>
                           Document Editor have multiple features like bold text, italic, text highligh, color text, image insertion.
                          </p>
                      </div>
                    }
                  />
                )
              }
            </div>
          )}
        />
        </>
    )
}

export { Help};