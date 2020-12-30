import React, { useState, useRef, useEffect } from 'react'

export default function Drawer({ children ,isOpen ,setIsOpen ,navItems ,side = "left"  }) {
   const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);
   const wrapperRef = useRef(null);

   const handleOutSideClicked = ({ target }) => {  
      if (wrapperRef.current !== target) return;

      setIsOpen(false);
   }

   useEffect(() => {
      setIsDrawerOpen(isOpen);
   }, [isOpen])

   function renderSideClasses(left, right) {
      if (side === "right") return right;

      return left;
   } 


   return (
      <>
         {isDrawerOpen && <div onMouseDown={handleOutSideClicked} ref={wrapperRef} className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 bg-opacity-50">
            <div className={`bg-white w-64 drawer-${renderSideClasses("left", "right")}`}>
               {children}
            </div>
         </div>}
      </>
   )
}
