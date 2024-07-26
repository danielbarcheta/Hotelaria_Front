import React, { useEffect, useState } from 'react';
import { atualizaQuarto, getQuartoById } from '../utils/FuncoesAPI';
import { useParams } from 'react-router-dom';

const EditarQuarto = () => {
  const [quarto, setQuarto] = useState({
    foto: null,
    tipoQuarto: "",
    precoQuarto: ""
  });
  const [previaImagem, setPreviaImagem] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { quartoId } = useParams();

  useEffect(() => {
    fetchQuartos();
  }, []);

  const fetchQuartos = async () => {
    setIsLoading(true);
    try {
      const result = await getQuartoById(quartoId);
      setQuarto(result);
      if (result.foto) {
        setPreviaImagem(`data:image/jpeg;base64,${result.foto}`); // Assumindo que 'foto' é a string Base64 da imagem
      }
      setIsLoading(false);
    } catch (erro) {
      setMensagemErro(`Erro ao buscar o quarto ${quartoId}: ${erro.message}`);
      setIsLoading(false);
    }
  };

  const handleMudaImagem = (e) => {
    const imagemSelecionada = e.target.files[0];
    setQuarto(prevState => ({
      ...prevState,
      foto: imagemSelecionada
    }));
    setPreviaImagem(URL.createObjectURL(imagemSelecionada));
  };

  const handleMudaInputQuarto = (e) => {
    const { name, value } = e.target;
    setQuarto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await atualizaQuarto(quartoId, quarto);
      if (response.status === 200) {
        setMensagemSucesso("Quarto atualizado com sucesso!");
        const quartoAtualizado = await getQuartoById(quartoId);
        setQuarto(quartoAtualizado);
        if (quartoAtualizado.foto) {
          setPreviaImagem(`data:image/jpeg;base64,${quartoAtualizado.foto}`); // Atualiza a prévia da imagem com a nova imagem
        }
        setMensagemErro("");
      } else {
        setMensagemErro("Erro ao atualizar o quarto.");
      }
    } catch (error) {
      setMensagemErro(`Erro ao atualizar o quarto ${quartoId}: ${error.message}`);
    }
    setTimeout(() => {
      setMensagemSucesso("");
      setMensagemErro("");
    }, 5000);
    fetchQuartos(); // Recarrega os dados após a atualização
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className='col-md-8 col-lg-6'>
            <h2 className='mt-5 mb-2 title'>Edite o quarto {quartoId}</h2>
            {mensagemSucesso && (
              <div className="alert alert-success fade show"> {mensagemSucesso}</div>
            )}
            {mensagemErro && (
              <div className="alert alert-danger fade show"> {mensagemErro}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor="tipoQuarto" className='custom-label'>
                  Tipo de Quarto
                </label>
                <div>
                  {/* Componente TipoQuartoSeletor */}
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor="precoQuarto" className='custom-label'>
                  Preço
                </label>
                <input
                  className='form-control'
                  required
                  id="precoQuarto"
                  type="number"
                  name='precoQuarto'
                  value={quarto.precoQuarto}
                  onChange={handleMudaInputQuarto}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="foto" className='custom-label'>
                  Foto
                </label>
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  className='form-control'
                  onChange={handleMudaImagem}
                />
                {previaImagem && (
                  <img
                    src={previaImagem}
                    alt="Foto Previa Imagem"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className='mb-3'
                  />
                )}
              </div>
              <div className='d-grid d-md-flex mt-2'>
                <button className='btn btn-outline-primary ml-5'>
                  Salvar Quarto
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditarQuarto;
