import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home.jsx"
import Login from "./Components/Login.jsx"
import Register from "./Components/Register.jsx"
import Dashboard from "./Components/Dashboard.jsx"
import Dscprocess from "./Components/Dscprocess.jsx"
import Steamver from "./Components/Steamverify.jsx"
import Error404 from "./Components/Notfound.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dscprocess" element={<Dscprocess />} />
      <Route path="/steamprocess" element={<Steamver />} />
      <Route path='*' element={<Error404 />}/>
    </Routes>
  );
}

export default App;
