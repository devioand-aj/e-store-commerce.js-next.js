import React, { useState } from 'react'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs'
import { BiFilterAlt } from 'react-icons/bi'

export default function dropdown({ onSelect, items }) {
   const [isOpen, setIsOpen] = useState(false);
   const [filterBy, setFilterBy] = useState('date');

   const onDropdownItemClick = ({ target: { id, value } }) => {
      setFilterBy(id);
      onSelect(id);
   }

   return (
      <div 
         style={{ WebkitTapHighlightColor: 'transparent' }}  
         className="relative flex p-2 select-none cursor-pointer bg-secondary focus:outline-none"
         onClick={() => setIsOpen(!isOpen)} 
      >
         <div className="flex items-center text-gray-400"><BiFilterAlt /></div>
         <div className="mx-2">Filter by {filterBy}</div>
         <div className="flex items-center">
            {isOpen ? <BsArrowUpShort /> : <BsArrowDownShort />}
         </div>

         {isOpen && <DropdownItems items={items} itemClick={onDropdownItemClick} onMouseLeave={() => setIsOpen(false)} />}
      </div>
   )
}

function DropdownItems({ items, itemClick, onMouseLeave }) {
   return (
      <div onMouseLeave={onMouseLeave} className="z-10 w-full absolute top-full bg-gray-100 rounded-sm shadow-md">
         <ul className="">
            {items.map(({label, id}) => (
               <li key={id} onClick={itemClick} id={id} className="p-2 hover:bg-gray-200">{label}</li>
            ))}
         </ul>
      </div>
   )
}
