import React, { useEffect, useState } from 'react';
import { getAllQuartos } from '../utils/FuncoesAPI';
import CardQuarto from './CardQuarto';
import { Col, Container, Row } from 'react-bootstrap';
import QuartoFilter from './QuartoFilter';
import QuartoPaginator from './QuartoPaginator';

const Quarto = () => {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1); // Alterado de var para const
  const quartosPorPagina = 6;
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllQuartos()
      .then((dados) => {
        setDados(dados);
        setDadosFiltrados(dados);
        setIsLoading(false);
      })
      .catch((erro) => {
        setErro(erro);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Carregando Quartos...</div>;
  }

  if (erro) {
    return <div className='text-danger'>Erro: {erro}</div>;
  }

  const handleMudaPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina); // Correção aqui
  };

  const totalPaginas = Math.ceil(dadosFiltrados.length / quartosPorPagina); // Correção aqui

  const quartosRenderizados = () => {
    const indexInicio = (paginaAtual - 1) * quartosPorPagina;
    const indexFim = indexInicio + quartosPorPagina;

    return dadosFiltrados.slice(indexInicio, indexFim).map((quarto) => (
      <CardQuarto key={quarto.id} quarto={quarto} />
    ));
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <QuartoFilter dados={dados} setDadosFiltrados={setDadosFiltrados} />
          </Col>

          <Col md={6} className="d-flex align-items-center justify-content-end">
            <QuartoPaginator
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onChangePagina={handleMudaPagina}
            />
          </Col>
        </Row>

        <Row>{quartosRenderizados()}</Row>

        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <QuartoPaginator
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onChangePagina={handleMudaPagina}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Quarto;
