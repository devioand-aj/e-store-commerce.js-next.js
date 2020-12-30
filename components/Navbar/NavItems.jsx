import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import NavItem from './NavItem';

const defaultNavItems = [
   { title: 'Home', path: "/"  },
   { title: 'Products', path: "/products"  },
   { title: 'About', path: "/about"  },
   { title: 'Contact Us', path: "/contact"  },
]

export default function NavItems({ layout = "navbar", navItems = defaultNavItems, onLinkChange ,className, childClassName }) {
   const router = useRouter();
   const [currLocation, setCurrLocation] = useState('/');
   const [isSubItemsOpen, setIsSubItemsOpen] = useState(false);

   const { pathname, asPath } = router;

   useEffect(() => {
      if (asPath === "/") return setCurrLocation("/home");
      setCurrLocation(asPath);
   }, [asPath])

   return (
      <ul className={`${className}`} onMouseLeave={() => setIsSubItemsOpen(false)}>
         {navItems.map(item => (
            <NavItem key={item.title} layout={layout} item={item} currLocation={currLocation} setIsSubItemsOpen={setIsSubItemsOpen} isSubItemsOpen={isSubItemsOpen} onLinkChange={onLinkChange} className={childClassName} />
         ))}
      </ul>
   )
}