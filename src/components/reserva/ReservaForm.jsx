import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getQuartoById, reservarQuarto } from '../utils/FuncoesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import ReservaSummary from './ReservaSummary';

const ReservaForm = () => {
  const [isValidado, setIsValidado] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [precoQuarto, setPrecoQuarto] = useState(0);
  const [reserva, setReserva] = useState({
    nomeCompletoHospede: "",
    emailHospede: "",
    dataCheckIn: "",
    dataCheckOut: "",
    numeroAdultos: 0,
    numeroCriancas: 0
  });

  const { quartoId } = useParams();
  const navigate = useNavigate();

  const getPrecoQuartoById = async (quartoId) => {
    try {
      const response = await getQuartoById(quartoId);
      setPrecoQuarto(response.precoQuarto);
    } catch (error) {
      console.error("Erro ao buscar preço do quarto", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReserva({ ...reserva, [name]: value });
    setMensagemErro("");
  }

  useEffect(() => {
    getPrecoQuartoById(quartoId);
  }, [quartoId]);

  const calcularPagamento = () => {
    const dataCheckIn = moment(reserva.dataCheckIn);
    const dataCheckOut = moment(reserva.dataCheckOut);
    const diffDias = dataCheckOut.diff(dataCheckIn, 'days');
    const preco = precoQuarto || 0;
    return diffDias * preco;
  }

  const isContagemHospedesValida = () => {
    const numAdultos = parseInt(reserva.numeroAdultos, 10);
    const numCriancas = parseInt(reserva.numeroCriancas, 10);
    const numTotal = numAdultos + numCriancas;
    return numTotal >= 1 && numAdultos >= 1;
  }

  const isDataCheckOutValida = () => {
    const dataCheckIn = moment(reserva.dataCheckIn, 'YYYY-MM-DD');
    const dataCheckOut = moment(reserva.dataCheckOut, 'YYYY-MM-DD');
    if (!dataCheckOut.isSameOrAfter(dataCheckIn)) {
      setMensagemErro("Data de check-out deve ser depois da data de check-in");
      return false;
    }
    setMensagemErro("");
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isContagemHospedesValida() || !isDataCheckOutValida()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidado(true);
  }

  const handleReserva = async () => {
    try {
      const codigoConfirmacao = await reservarQuarto(quartoId, reserva);
      setIsSubmitted(true);
      navigate("/", { state: { message: codigoConfirmacao } });
    } catch (erro) {
      setMensagemErro(erro.message || erro);
      navigate("/", { state: { erro: erro.message || erro } });
    }
  }

  return (
    <div className='container mb-5'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card card-body mt-5'>
            <h4 className='card-title'>Reservar quarto</h4>
            <Form noValidate validated={isValidado} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor='nomeCompletoHospede'>Nome Completo:</Form.Label>
                <FormControl
                  required
                  type='text'
                  name='nomeCompletoHospede'
                  value={reserva.nomeCompletoHospede}
                  placeholder='Digite seu nome completo'
                  onChange={handleInputChange}
                />
                <FormControl.Feedback type='invalid'>
                  Por favor insira seu nome completo
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor='emailHospede'>Email:</Form.Label>
                <FormControl
                  required
                  type='email'
                  name='emailHospede'
                  value={reserva.emailHospede}
                  placeholder='Digite seu e-mail'
                  onChange={handleInputChange}
                />
                <FormControl.Feedback type='invalid'>
                  Por favor insira seu e-mail
                </FormControl.Feedback>
              </Form.Group>

              <fieldset style={{ border: "2px" }}>
                <legend>Período de hospedagem</legend>
                <div className='row'>
                  <div className='col-6'>
                    <Form.Label htmlFor='dataCheckIn'>Data Check-In:</Form.Label>
                    <FormControl
                      required
                      type='date'
                      name='dataCheckIn'
                      value={reserva.dataCheckIn || ""}
                      placeholder='Digite sua data de check-in'
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type='invalid'>
                      Por favor insira sua data de check-in
                    </FormControl.Feedback>
                  </div>

                  <div className='col-6'>
                    <Form.Label htmlFor='dataCheckOut'>Data Check-Out:</Form.Label>
                    <FormControl
                      required
                      type='date'
                      name='dataCheckOut'
                      value={reserva.dataCheckOut || ""}
                      placeholder='Digite sua data de check-out'
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type='invalid'>
                      Por favor insira sua data de check-out
                    </FormControl.Feedback>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Numero de Hospedes</legend>
                <div className='row'>
                  <div className='col-6'>
                    <Form.Label htmlFor="numeroAdultos">Adultos:</Form.Label>
                    <FormControl
                      required
                      type='number'
                      name='numeroAdultos'
                      value={reserva.numeroAdultos}
                      placeholder='0'
                      min={1}
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type='invalid'>
                      Por favor, selecione ao menos um adulto
                    </FormControl.Feedback>
                  </div>

                  <div className='col-6'>
                    <Form.Label htmlFor="numeroCriancas">Crianças:</Form.Label>
                    <FormControl
                      required
                      type='number'
                      name='numeroCriancas'
                      value={reserva.numeroCriancas}
                      placeholder='0'
                      onChange={handleInputChange}
                    />
                    <FormControl.Feedback type='invalid'>
                      Por favor, digite o número de crianças.
                    </FormControl.Feedback>
                  </div>
                </div>
              </fieldset>

              {mensagemErro && <p className='error-message text-danger'>{mensagemErro}</p>}

              <div className='form-group mt-2 mb-2'>
                <button type='submit' className='btn btn-hotel'>
                  Continuar
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className='col-md-6'>
          {isSubmitted && (
            <ReservaSummary
              reserva={reserva}
              pagamento={calcularPagamento()}
              isFormularioValido={isValidado}
              onConfirm={handleReserva}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservaForm;
