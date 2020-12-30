import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { FiMenu } from 'react-icons/fi'
import { BsHeartFill } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'
import { BiArrowBack } from 'react-icons/bi';

import Drawer from './Drawer';
import NavItems from './NavItems';
import { cartContext } from '../../contexts/cart';
import { globalContext } from '../../contexts/global';
import { Button } from '../Common';
import { IconTray, BadgeIcon } from '../Icons';
import useFavourite from '../../hooks/useFavourite';
import useCategory from '../../hooks/useCategory';

const defaultSubItems = [
   { name: 'Headphones', slug: "/headphones" },
   { name: 'Mobiles', slug: "/mobiles" },
]

function Navbar() {
   const router = useRouter();
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const { itemsCount } = useContext(cartContext);
   const { onClickPrevPage } = useContext(globalContext);
   const { countFavouriteItems } = useFavourite();
   const categoryContext = useCategory();

   const navItems = [
      { title: 'Home', path: "/", strictPath: "/home"  },
      { title: 'Products', path: "/products", subItems: categoryContext.categories  },
      { title: 'About', path: "/about"  },
   ]

   const handleClickOnDrawerItem = () => {
      setTimeout(() => {
         setIsDrawerOpen(false);
      }, 200);
   }

   return (
      <> 
         <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
            <Button onClick={handleClickOnDrawerItem} variant="primary" label="Close" className="mt-4 w-11/12 mx-auto" />
            <NavItems 
               navItems={navItems} 
               onLinkChange={handleClickOnDrawerItem}  
               className="flex flex-col"
               childClassName="mx-10 my-2 text-xl mt-4 "
               layout="drawer"
            />
         </Drawer>
         <nav className="flex container max-w-full sticky top-0 z-10 py-4 sm:px-16 px-7 bg-secondary">
            <div onClick={() => onClickPrevPage()} className="cursor-pointer select-none flex justify-center items-center mr-8">
               <BiArrowBack className="text-3xl" />
            </div>

            <Link href="/">
               <div className="flex justify-center items-center">
                  <h1 className="cursor-pointer text-xl md:text-2xl">e-Commerce</h1>
               </div>
            </Link>

            <div className="flex justify-between items-center ml-16">
               <NavItems 
                  navItems={navItems} 
                  className="hidden lg:flex" 
                  childClassName="mx-2 my-1 text-lg "
                  layout="navbar"
               />

               <IconTray className="absolute right-16">
                  <BadgeIcon badge={countFavouriteItems}>
                     <BsHeartFill size={21} onClick={() => router.push("/favourite")} />
                  </BadgeIcon>
                  <BadgeIcon badge={itemsCount}>
                     <FaShoppingCart size={22}  onClick={() => router.push("/cart")} />
                  </BadgeIcon>
               </IconTray>
               
               <div className="absolute lg:hidden right-6 active-shrink">
                  <FiMenu size={20} onClick={() => setIsDrawerOpen(true)} />
               </div>
            </div>
         </nav>
      </>
   )
}

export default Navbar