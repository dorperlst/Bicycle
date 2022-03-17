import React, { useState } from 'react'
import Modal from '../layout/Modal'

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

export default function PopUp() {
  const [isOpen, setIsOpen] = useState(false)

  const onClick=(e)=>{
    e.preventDefault();

    setIsOpen(true) 
   }

  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={onClick} >
        <button  >Open Modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <div>Fancy Modal</div>
        </Modal>
      </div>

     </>
  )
}