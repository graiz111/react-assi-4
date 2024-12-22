import React from 'react'
import './header.css'


function header(){
  return (
    <div>
      <header className='header'>
        <div className='hname'>react-assi-2</div>
        <nav>
         <ul className='nav'>
           <li>Home</li>
           <li>Products</li>
           <li>About</li>
           <li>Contact</li>
         </ul>
        </nav>
      </header>
    </div>
  )
}

export default header

