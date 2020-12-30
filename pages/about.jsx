import React from 'react'

export default function About({ phone }) {
   return (
      <div>
         <h1>About Us</h1>
         <p>Contact: {phone}</p>
         <p>Still under development :)</p>
      </div>
   )
}

export async function getStaticProps() {
   return {
      props: {
         phone: "0307-7331193"
      }
   }
}