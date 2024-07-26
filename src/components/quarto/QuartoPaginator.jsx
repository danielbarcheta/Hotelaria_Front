import React from 'react'
import _default from 'react-bootstrap/esm/Carousel'

const QuartoPaginator = ({paginaAtual, totalPaginas, onChangePagina}) => {
  const numerosPagina =  Array.from({length : totalPaginas}, (_, i) => i + 1)
  return (
    <nav>
      <ul className='pagination justify-content-center'>
  {numerosPagina.map((numPagina) => (
    <li key={numPagina} className={`page-item ${paginaAtual === numPagina ? "active" : ""}`}>
      <button className='page-link' onClick={() => onChangePagina(numPagina)}>
        {numPagina}
      </button>
    </li>
  ))}
</ul>


    </nav>
  )
}

export default QuartoPaginator
