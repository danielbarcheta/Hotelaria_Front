import React, { useEffect, useState } from 'react'
import { getAllQuartos } from '../utils/FuncoesAPI'
import { Link } from 'react-router-dom'
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap'

const QuartosCarousel = () => {
  const [quartos, setQuartos] = useState([{ id: "", tipoQuarto: "", precoQuarto: "", foto: "" }])
  const [mensagemErro, setMensagemErro] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAllQuartos().then((dados) => {
      setQuartos(dados)
      setIsLoading(false)
    }).catch((erro) => {
      setMensagemErro(erro.message)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div>Carregando quartos...</div>
  }
  if (mensagemErro) {
    return <div className="text-danger mb-5 mt-5">{mensagemErro}</div>
  }
  
  return (
    <>
      <div className='todos-quartos Palace'>
        <Link to={"/quartos-listados"} className='hotel-color text-center todos-quartos Palace'>
          <i className="bi bi-view-list"></i> Ver tudo
        </Link>
      </div>
      <section className=' mb-1 mt-1  palachotel'>
        <Container>
          <Carousel indicators={false}>
            {[...Array(Math.ceil(quartos.length / 4))].map((_, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {quartos.slice(index * 4, index * 4 + 4).map((quarto) => (
                    <Col key={quarto.id} className='mb-4' xs={12} md={6} lg={3}>
                      <Card>
                        <Link to={`/reservar-quarto/${quarto.id}`}>
                          <Card.Img
                            variant="top"
                            src={`data:image/png;base64,${quarto.foto}`}
                            alt="Foto do Quarto"
                            className="card-img-top"
                          />
                        </Link>
                        <Card.Body>
                          <Card.Title className="hotel-color">{quarto.tipoQuarto}</Card.Title>
                          <Card.Title className="preco-quarto">{quarto.precoQuarto}</Card.Title>
                          <div className='flex-shrink-0 mt-3'>
                            <Link to={`reservas/${quarto.id}`} className="btn btn-hotel btn-sm">
                              Reservar Agora
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    </>
  )
}

export default QuartosCarousel
