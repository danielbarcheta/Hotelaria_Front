import React, { useState } from 'react';
import { addQuarto } from '../utils/FuncoesAPI';
import TipoQuartoSeletor from '../commom/TipoQuartoSeletor';
import './AddQuarto.css';
import { Link } from 'react-router-dom';

const AddQuarto = () => {
    const [novoQuarto, setNovoQuarto] = useState({
        photo: null,
        tipoQuarto: "",
        precoQuarto: ""
    });

    const [previaImagem, setPreviaImagem] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const handleMudaInputQuarto = (e) => {
        const { name, value } = e.target;
        setNovoQuarto(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleMudaImagem = (e) => {
        const imagemSelecionada = e.target.files[0];
        setNovoQuarto(prevState => ({
            ...prevState,
            photo: imagemSelecionada
        }));
        setPreviaImagem(URL.createObjectURL(imagemSelecionada));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const sucesso = await addQuarto(novoQuarto.photo, novoQuarto.tipoQuarto, novoQuarto.precoQuarto);
            if(sucesso != undefined){
                setMensagemSucesso("Novo quarto adicionado com sucesso!");
                setNovoQuarto({ photo: null, tipoQuarto: "", precoQuarto: "" });
                setPreviaImagem("");
                setMensagemErro("");
            } else {
                setMensagemErro("Erro ao adicionar quarto novo.")
            }
        } catch(error) {
            setMensagemErro(error);
        }
        setTimeout(() => {
            setMensagemSucesso("")
            setMensagemSucesso("")

        }, 5000);

    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2 title'>Adicione um novo quarto</h2>
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
                                    <TipoQuartoSeletor
                                        handleMudancaDoInputNovoQuarto={handleMudaInputQuarto}
                                        novoQuarto={novoQuarto}
                                    />
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
                                    value={novoQuarto.precoQuarto}
                                    onChange={handleMudaInputQuarto}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="photo" className='custom-label'>
                                    Foto
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className='form-control'
                                    onChange={handleMudaImagem}
                                />
                                {previaImagem &&  (
                                    <img
                                        src={previaImagem}
                                        alt="Foto Previa Imagem"
                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                        className='mb-3'
                                    />
                                )}
                            </div>
                            <div className='d-grid gap-2 d-md-flex mt-2'>
                                <Link to={"/quartos-existentes"} className="btn btn-outline-info"/> Voltar
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
}

export default AddQuarto;
