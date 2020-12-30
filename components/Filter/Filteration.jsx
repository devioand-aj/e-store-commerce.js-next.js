import React from 'react'

import Dropdown from './Dropdown'
import Search from './Search';
import useProduct from '../../hooks/useProduct';

const dropdownItems = [
   { id: "date", label: "Date" },
   { id: "name", label: "Name" },
   { id: "price", label: "Price" },
]

export default function Filteration() {
   const { searchQuery, onSearchQueryChange, onSortQueryChange } = useProduct();

   return (
      <div className="flex flex-row justify-center flex-wrap">
         <div className="my-2 mx-4">
            <Search value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} />
         </div>
         <div className="my-2 mx-4">
            <Dropdown onSelect={(key) => onSortQueryChange(key)} items={dropdownItems}  />
         </div>
      </div>
   )
}
