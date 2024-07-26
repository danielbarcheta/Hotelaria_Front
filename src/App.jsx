import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddQuarto from "./components/quarto/AddQuarto";
import EditarQuarto from './components/quarto/EditarQuarto';
import QuartosExistentes from './components/quarto/QuartosExistentes';
import Home from './components/home/Home';
import ImageComponent from './components/quarto/ImageComponent';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/add-quarto' element={<AddQuarto/>}/>
          <Route path="/editar-quarto/:quartoId" element={<EditarQuarto />} />
          <Route path="/quartos-existentes" element={<QuartosExistentes />} />
          <Route path="/image" element={<ImageComponent />} />
        </Routes>
       </Router>
       <Footer/>
    </main>
    </>
  );
}

export default App;
