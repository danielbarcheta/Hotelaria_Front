import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddQuarto from "./components/quarto/AddQuarto";
import EditarQuarto from './components/quarto/EditarQuarto';
import QuartosExistentes from './components/quarto/QuartosExistentes';
import Home from './components/home/Home';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ListagemQuartos from './components/quarto/ListagemQuartos';
import Admin from './components/admin/Admin';
import Checkout from './components/checkout/Checkout';

function App() {
  return (
    <>
      <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/add-quarto' element={<AddQuarto/>}/>
          <Route path="/editar-quarto/:quartoId" element={<EditarQuarto />}/>
          <Route path="/quartos-existentes" element={<QuartosExistentes />}/>
          <Route path='/quartos-listados' element={<ListagemQuartos/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/reservar-quarto/:quartoId' element={<Checkout/>}/>
        </Routes>
       </Router>
    </main>
    </>
  );
}

export default App;
