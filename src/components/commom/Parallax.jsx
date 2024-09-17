import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className=' px-5 py-5 justify-content-center'>
        <div className='animated-texts bounce-in'>
          <h1>
          O mais <span className='hotel-color'>luxuoso</span>
          </h1>
          <h3>hotel de Bahamas</h3>
        </div>
      </Container>

    </div>
  )
}

export default Parallax
