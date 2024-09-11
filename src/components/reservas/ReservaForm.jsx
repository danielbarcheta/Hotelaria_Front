import React, { useEffect, useState } from 'react'
import moment from 'moment'

const ReservaForm = () => {
    const [isValidado, setIsValidado] = useState(false)
    const [submited, isSubmited] = useState(false)
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

    const isHospedeValido = () => {
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
      if(form.checkValidity( === false || !isHospedeValido))
    }

  return (
    <div>ReservaForm</div>
  )
}

export default ReservaForm