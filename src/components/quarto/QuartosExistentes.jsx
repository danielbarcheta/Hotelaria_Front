import React, { useEffect, useState } from 'react'
import { deleteQuarto, getAllQuartos } from '../utils/FuncoesAPI'
import QuartoPaginator from './QuartoPaginator'
import QuartoFilter from './QuartoFilter'
import { Col, Row } from 'react-bootstrap'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AddQuarto from './AddQuarto'

const QuartosExistentes = () => {
  const [quartos, setQuartos] = useState([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const quartosPorPag = 8
  const [isLoading, setIsLoading] = useState(false)
  const [quartosFiltrados, setQuartosFiltrados] = useState([])
  const [tipoQuartoSelecionado, setTipoQuartoSelecionado] = useState("")
  const [mensagemErro, setMensagemErro] = useState("")
  const [mensagemSucesso, setMensagemSucesso] = useState("")

  useEffect(() => {
    fetchQuartos()
  }, [])

  const fetchQuartos = async () => {
    setIsLoading(true)
    try {
      const result = await getAllQuartos()
      setQuartos(result)
      setIsLoading(false)
    } catch (erro) {
      setMensagemErro(erro.message)
    }
  }

  useEffect(() => {
    if (tipoQuartoSelecionado === "") {
      setQuartosFiltrados(quartos)
    } else {
      const filtrado = quartos.filter((quarto) => quarto.tipoQuarto === tipoQuartoSelecionado)
      setQuartosFiltrados(filtrado)
    }
    setPaginaAtual(1)
  }, [quartos, tipoQuartoSelecionado])

  const handlePaginacaoClick = (numeroPagina) => {
    setPaginaAtual(numeroPagina)
  }

  const handleDeletar = async (quartoId) => {
    try {
      const result = await deleteQuarto(quartoId)
      if (result === "") {
        setMensagemSucesso(`Quarto ${quartoId} deletado com sucesso`)
        fetchQuartos()
      } else {
        console.log(`Erro deletando o quarto ${quartoId}. `)
      }
    } catch (error) {
      setMensagemErro(error.message)
    }
    setTimeout(() => {
      setMensagemErro("")
      setMensagemSucesso("")
    }, 6000)
  }

  const calcularTotalPaginas = (quartosFiltrados, quartosPorPag, quartos) => {
    let totalQuartos = quartosFiltrados.length > 0 ? quartosFiltrados.length : quartos.length
    return Math.ceil(totalQuartos / quartosPorPag)
  }

  const indexUltimoQuarto = paginaAtual * quartosPorPag
  const indexPrimeiroQuarto = indexUltimoQuarto - quartosPorPag
  const quartosAtuais = quartosFiltrados.slice(indexPrimeiroQuarto, indexUltimoQuarto)

  return (
    <div>
      {isLoading ? (
        <p>Carregando quartos...</p>
      ) : (
        <section className='mt-5 mb-5 container'>
          <div className='d-flex justify-content-between mb-3 mt-5'>
            <h2>Quartos existentes</h2>
          </div>

        <Row>
          <Col md={6} className='mb-3 mb-md-0'>
            <QuartoFilter dados={quartos} setDadosFiltrados={setQuartosFiltrados} />
          </Col>

          <Col md={6} className='d-flex justify-content-end'>
          <Link to={"/add-quarto"}>
            <FaPlus/> Add quarto
             </Link>
          </Col>
          </Row>

          <table className='table table-bordered table-hover'>
            <thead>
              <tr className='text-center'>
                <th>ID</th>
                <th>Tipo</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {quartosAtuais.map((quarto) => (
                <tr key={quarto.id} className='text-center'>
                  <td>{quarto.id}</td>
                  <td>{quarto.tipoQuarto}</td>
                  <td>{quarto.precoQuarto}</td>
                  <td>
                    <Link to={`/editar-quarto/${quarto.id}`} className='btn btn-info me-2'>
                      <FaEye />
                    </Link>
                    <Link to={`/editar-quarto/${quarto.id}`} className='btn btn-warning me-2'>
                      <FaEdit />
                    </Link>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeletar(quarto.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <QuartoPaginator
            paginaAtual={paginaAtual}
            totalPaginas={calcularTotalPaginas(quartosFiltrados, quartosPorPag, quartos)}
            onChangePagina={handlePaginacaoClick}
          />
        </section>
      )}
    </div>
  )
}

export default QuartosExistentes
