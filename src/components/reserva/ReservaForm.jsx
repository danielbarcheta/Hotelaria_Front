import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { getReservaByCodigoConfirmacao, reservarQuarto } from '../utils/FuncoesAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'

const ReservaForm = () => {
    const [isValidado, setIsValidado] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("")
    const [precoQuarto, setPrecoQuarto] = useState(0)
    const [reserva, setReserva] = useState({
      nomeCompletoHospede: " ",
      emailHospede: " ",
      dataCheckIn: " ",
      dataCheckOut: " ",
      numeroAdultos: " ",
      numeroCriancas: " "
    })

    const [quartoInfo, setQuartoInfo] = useState({ 
      foto: " ",
      tipoQuarto: " ",
      precoQuarto: " "
    })

    const { quartoId } = useParams

    const navigate = useNavigate()

    const getPrecoQuartoById = async (quartoId) => {
      try{
        const response = await getRoomById(quartoId)
        setPrecoQuarto(response.precoQuarto)
      }catch(error){
        throw new Error(error)
      }
    }
  
    const handleInputChange = (e) => {
      const{nome, valor} = e.target
      setReserva({...reserva, [nome]: valor})
      setMensagemErro("")
    }

    useEffect(() => {
      getPrecoQuartoById(quartoId)
    }, [quartoId]
    )

    const calcularPagamento = () => {
      const dataCheckIn = moment(reserva.dataCheckIn)
      const dataCheckOut = moment(reserva.dataCheckOut)
      const diffDias = dataCheckOut.diff(dataCheckIn)
      const preco = precoQuarto ? precoQuarto : 0
      return diffDias * preco
    }

    const isContagemHospedesValida = () => {
      const numAdultos = parseInt(reserva.numeroAdultos)
      const numCriancas = parseInt(reserva.numeroCriancas)
      const numTotal = numAdultos + numCriancas
      return numTotal >=1 && numeroAdultos >= 1
    }

    const isDataCheckOutValida = () => {
      if(!moment(reserva.dataCheckOut).isSameOrAfter(moment(reserva.dataCheckIn))) {
        setMensagemErro("Data de check-out deve ser depois da data de check-in")
        return false
      } else {
        setMensagemErro("")
        return true
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.currentTarget
      if(form.checkValidity() === false || !isContagemHospedesValida || !isDataCheckOutValida) {
        e.stopPropagation()
      } else {
        setIsSubmitted(true)
      }
      setIsValidado(true)
    }

    const handleReserva = async () => {
        try{ codigoConfirmacao = await reservarQuarto(quartoId, reserva);
            setIsSubmitted(true)
            navigate("/", {state: {message : codigoConfirmacao}})
    } catch(erro) {
        setMensagemErro(erro)
        navigate("/", {state: {erro : mensagemErro}})
    }
}

  return (
    <>
    <div className='container mb-5'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card card-body mt-5'>
            <h4 className='card card-title'>Reservar quarto</h4>
            <Form noValidate validated={isValidado} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor='nomeCompletoHospede'>Nome Completo:</Form.Label>
                  <FormControl
                  required
                  type='text'
                  id='nomeCompletoHospede'
                  value={reserva.nomeCompletoHospede}
                  placeholder='Digite seu nome completo'
                  onChange={handleInputChange}/>

                  <FormControl.Feedback type='invalid'>
                    Por favor insira seu nome completo
                  </FormControl.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor='emailHospede'>Email:</Form.Label>
                  <FormControl
                  required
                  type='email'
                  id='emailHospede'
                  value={reserva.nomeCompletoHospede}
                  placeholder='Digite seu e-mail'
                  onChange={handleInputChange}/>

                  <FormControl.Feedback type='invalid'>
                    Por favor insira seu e-mail 
                  </FormControl.Feedback>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default ReservaForm