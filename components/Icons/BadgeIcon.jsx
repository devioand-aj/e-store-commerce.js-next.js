import React from 'react'

export default function BadgeIcon({ children, badge = 1 }) {
   return (
      <div className="relative mx-2 flex items-center active-shrink">
         {badge > 0 && <div className="bg-red-500 text-xs absolute -right-1 -top-1 text-white" style={{
            padding: '0 5px',
            borderRadius: '20px',
            top: '-3px',
            right: '-10px',
         }}>{badge}</div>}
         {children}
      </div>
   )
}
