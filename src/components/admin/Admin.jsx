import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Painel de Administração</h2>
      <Link to={"/add-quarto"}>Gerenciar Quartos</Link>
    </section>
  )
}

export default Admin
