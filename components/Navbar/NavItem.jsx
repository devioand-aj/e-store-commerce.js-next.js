import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import _ from 'lodash';

export default function NavItem({ layout, className, isSubItemsOpen, setIsSubItemsOpen, onLinkChange, item: { title, path, subItems, strictPath } }) {   
   const router = useRouter();
   const [currLocation, setCurrLocation] = useState('/');
   
   const { pathname, asPath } = router;
   useEffect(() => {
      if (asPath === "/") return setCurrLocation("/home");
      setCurrLocation(asPath);
   }, [asPath])

   const getHoverEffect = (subItems) => {
      if (subItems && layout === "navbar") setIsSubItemsOpen(true);
   }

   const setStylesOnPath = (path, strictPath) => {
      let classes = "transition-all border-b-2 hover:border-red-500";

      if (!(_.includes(currLocation, (strictPath ? strictPath :path)))) return classes += " border-transparent";

      return classes += " border-primary";
   }

   return (
      <div>
         <li key={title} className={`flex flex-col mx-4 ${className}`}>
            <div className="flex">
               <Link href={path}>
                  <a onClick={onLinkChange} className={setStylesOnPath(path, strictPath)}>{title}</a>
               </Link>
               {(subItems && subItems.length > 0) &&<NavArrowIcon layout={layout} onMouseEnter={() => getHoverEffect(subItems)} isOpen={isSubItemsOpen} onClick={() => setIsSubItemsOpen(!isSubItemsOpen)} />}
            </div>
            {(subItems && subItems.length > 0 && isSubItemsOpen) && <NavSubItems 
               layout={layout} 
               subItems={subItems} 
               currLocation={currLocation} 
               onMouseLeave={() => setIsSubItemsOpen(false)} 
               onClick={onLinkChange}
            />}
         </li>
      </div>
   )
}


function NavSubItems({ layout, subItems, currLocation, onMouseLeave, onClick }) {
   const setStylesOnPath = (path) => {
      let classes = "mx-4 my-4 w-max transition-all border-b-2 hover:border-red-500";

      if (!(_.includes(currLocation, path))) return classes += " border-transparent";

      return classes += " border-primary";
   }

   const setStylesOnLayout = () => {
      let classes = "z-10 absolute top-10 bg-gray-100 w-max rounded-sm shadow-md";

      if (layout === "navbar") return classes;

      return "flex";
   }
   
   return (
      <div onMouseLeave={onMouseLeave} className={setStylesOnLayout()}>
         <ul className={`${layout === "navbar" ? "my-5" : "my-1 -mb-4"} mx-2`}>
            {subItems.map(({ name, slug }) => (
               <li key={name} className={setStylesOnPath(slug)} >
                  <Link href={`/${slug}`} passHref className={`border-b-2 border-primary`}>
                     <a onClick={onClick}>{name}</a>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

function NavArrowIcon({ layout, isOpen, onClick, onMouseEnter }) {
   const setStylesOnLayout = () => {
      let classes = 'relative cursor-pointer select-none flex justify-center items-center'
      
      if (layout === "drawer") return classes += " ml-auto";

      return classes += " ml-2"
   }

   return (
      <div 
         className={setStylesOnLayout()}
         onClick={onClick}
         onMouseEnter={onMouseEnter}   
      >
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}   
      </div>
   )
}