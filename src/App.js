import './App.css';
import { Route, Routes } from "react-router-dom";
 import Home from "./views/Home/Home.jsx";
import { Login, Inventory } from "./views";
import NavBar from "./Components/NavBar/NavBar.jsx";
import DetailProduct from "./views/DetailProduct/DetailProduct.jsx"
import Register from './views/Register/Register';
import PagoPaypal from "./Components/PagoPaypal/PagoPaypal.jsx";


function App() {
  return (
    <div className="App">
      <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Pagar" element={<PagoPaypal />}></Route>
        <Route path="/Registrarse" element={<Login />}></Route>
        <Route path="/Inventario" element={<Inventory />}></Route>
        <Route path="/Inventario/:id" element={<DetailProduct />}></Route>
      </Routes>
    </div>
  );
}

export default App;
