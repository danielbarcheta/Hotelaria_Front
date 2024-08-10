import React from 'react'
import HeaderMain from '../layout/HeaderMain'
import Parallax from '../commom/Parallax'
import ServicoHotel from '../commom/ServicoHotel'
import QuartosCarousel from '../commom/QuartosCarousel'

const Home = () => {
  return (
    <section>
      <HeaderMain/>

      <section className='container'>
        <QuartosCarousel/>
        <Parallax/>
        <QuartosCarousel/>
        <ServicoHotel/>
        <Parallax/>
        <QuartosCarousel/>
      </section>
    </section>
  )
}

export default Home
