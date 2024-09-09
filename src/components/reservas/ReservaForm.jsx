import React, { useState } from 'react'

const ReservaForm = () => {
    const [isValidado, setIsValidado] = useState(false)
    const [submited, isSubmited] = useState(false)]
    const [mensagemErro, setMensagemErro] = useState("")
    const [precoQuarto, setPrecoQuarto] = useState(0)
    const [reserva, setReserva] = useState({})
  return (
    <div>ReservaForm</div>
  )
}

export default ReservaForm