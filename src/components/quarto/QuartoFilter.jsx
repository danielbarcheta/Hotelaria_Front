import React, { useState } from 'react'

const QuartoFilter = ({dados, setDadosFiltrados}) => {
  const[filter, setFilter] = useState("")

  const handleSelectChange = (e) => {
    const tipoQuartoSelecionado = e.target.value
    setFilter(tipoQuartoSelecionado)

    const quartosFiltrados = dados.filter((quarto)=>
      quarto.tipoQuarto.toLowerCase()
      .includes(tipoQuartoSelecionado.toLowerCase()));

      setDadosFiltrados(quartosFiltrados)
  }

  const limpaFiltro = () =>  {
    setFilter("")
    setDadosFiltrados(dados)
  }

  const tiposQuarto = ["", ...new Set(dados.map((quarto)=>quarto.tipoQuarto))]

  return (
    <div className='input-group mb3'>
      <span className='mb-3 input-group-text' id="room-type-filter">
        Filtrar quartos por tipo
      </span>
      <select
      className='mb-3 form-select'
      value={filter}
      onChange={handleSelectChange}
      >
        <option value={""}>Selecione um tipo de quarto para filtrar.</option>
        {tiposQuarto.map((tipo,index) => (
          <option key={index} value={tipo}>{tipo}</option>
        ))}
      </select>
        <button className='btn btn-hotel mb-3' type='button' onClick={limpaFiltro}>
          Limpar filtro
        </button>



    </div>
  )
}

export default QuartoFilter
