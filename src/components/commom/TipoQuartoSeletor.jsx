import React, { useState, useEffect } from 'react';
import { getTiposQuarto } from '../utils/FuncoesAPI.js';
import './TipoQuartoSeletor.css';

const TipoQuartoSeletor = ({ handleMudancaDoInputNovoQuarto, novoQuarto }) => {
  const [tiposQuarto, setTiposQuarto] = useState([]);
  const [mostraInputNovoTipoQuarto, setMostraInputNovoTipoQuarto] = useState(false);
  const [novoTipoQuarto, setNovoTipoQuarto] = useState("");

  useEffect(() => {
    getTiposQuarto().then((data) => {
      setTiposQuarto(data);
    });
  }, []);

  const handleSelecionaTipoQuarto = (e) => {
    const valorSelecionado = e.target.value;
    if (valorSelecionado === "Add Novo") {
      setMostraInputNovoTipoQuarto(true);
    } else {
      setNovoTipoQuarto(valorSelecionado);
      handleMudancaDoInputNovoQuarto({ target: { name: 'tipoQuarto', value: valorSelecionado } });
      setMostraInputNovoTipoQuarto(false);
    }
  };

  const handleAddNovoTipoQuarto = () => {
    if (novoTipoQuarto.trim() !== "") {
      setTiposQuarto([...tiposQuarto, novoTipoQuarto]);
      setNovoTipoQuarto("");
      setMostraInputNovoTipoQuarto(false);
    }
  };

  return (
    <>
      <div>
        <select
          id='tipoQuarto'
          name='tipoQuarto'
          className='custom-select'
          value={novoQuarto.tipoQuarto || ""}
          onChange={handleSelecionaTipoQuarto}
        >
          <option value="">Selecione um tipo de quarto</option>
          <option value="Add Novo">Adicionar Novo</option>
          {tiposQuarto.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        {mostraInputNovoTipoQuarto && (
          <div className='input-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Novo tipo de quarto'
              value={novoTipoQuarto}
              onChange={(e) => setNovoTipoQuarto(e.target.value)}
            />
            <button className='btn btn-hotel' type='button' onClick={handleAddNovoTipoQuarto}>
              Adicionar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TipoQuartoSeletor;
