import React from 'react'
import HeaderMain from '../layout/HeaderMain'
import Parallax from '../commom/Parallax'
import ServicoHotel from '../commom/ServicoHotel'

const Home = () => {
  return (
    <section>
      <HeaderMain/>

      <section className='container'>
        <Parallax/>
        <ServicoHotel/>
        <Parallax/>
      </section>
    </section>
  )
}

export default Home
