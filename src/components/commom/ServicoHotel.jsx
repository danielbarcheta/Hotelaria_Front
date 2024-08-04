import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSwimmingPool, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const ServicoHotel = () => {
  return (
    <>
    <Container className='mb-2'>
      <Header title={"Nossos Serviços"}/>
      <Row>
        <h4 className='text-center'>
        Serviços do <span className='hotel-color'>Palace Hotel  </span>

        <span className='gap-2'>
          <FaClock/> Recepção 24h
        </span>
        </h4>
      </Row>
      <hr/>

      <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaWifi/> WiFi
              </Card.Title>
              <Card.Text>Conexão de altíssima velocidade.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaUtensils/> Café da manhã
              </Card.Title>
              <Card.Text>Comece o dia com um delicioso café da manhã.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaTshirt/> Lavanderia
              </Card.Title>
              <Card.Text>Serviço de lavanderia incluso.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaCocktail/> Frigobar
              </Card.Title>
              <Card.Text>Muitas opções de bebidas disponíveis.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaParking/> Estacionamento
              </Card.Title>
              <Card.Text>Estacionamento gratuito com manobristas.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaSwimmingPool/> Piscina Aquecida
              </Card.Title>
              <Card.Text>Área de lazer de luxo.</Card.Text>
            </Card.Body>
          </Card>
        </Col>





      </Row>
    </Container>

    </>
  )
}

export default ServicoHotel
