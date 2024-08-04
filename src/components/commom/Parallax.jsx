import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounce-in'>
          <h1>
          Bem vindo ao <span className='hotel-color'>Palace Hotel</span>
          </h1>
          <h3>Oferecemos os melhores serviços para suas necessidades.</h3>
        </div>
      </Container>

    </div>
  )
}

export default Parallax
