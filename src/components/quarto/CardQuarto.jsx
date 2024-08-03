import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CardQuarto = ({quarto}) => {
  return (
    <div>
      <Col>
      <Card key={quarto.id} className="mb-4" xs={12}>
        <Card.Body className="d-flex flex-wrap align-itens-center">
          <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>
            <Card.Img
            variant="top"
            src={`data:image/png;base64, ${quarto.foto}`}
            alt="Foto do Quarto"
            style={{width: "100%", maxWidth: "200px", height: "auto"}}/>
          </div>

          <div className="flex-grow-1 m1-3 px-5">
            <Card.Title className="hotel-color">{quarto.tipoQuarto}</Card.Title>
            <Card.Title className="preco-quarto">{quarto.precoQuarto}</Card.Title>
            <Card.Text>Informacoes sobre o quarto.</Card.Text>
          </div>

          <div className='flex-shrink-0 mt-3'>
            <Link to={`reservas/${quarto.id}`} className="btn btn-hotel btn-sm">
            Ver/Reservar
            </Link>

          </div>
        </Card.Body>


      </Card>



      </Col>

    </div>
  )
}

export default CardQuarto
