import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './layout/LoginSignup';
import Mainpage from './layout/Mainpage';



function App() {


  return (
    <Routes>
      <Route exact path="/" element={<LoginSignup />} />
      <Route exact path="/images" element={<Mainpage />} />

    </Routes>
  );
}

export default App;
