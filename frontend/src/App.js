import {Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import NotFound from './pages/NotFound'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <div className="App">
        <Navbar/>
          <div className="pages">
            <Routes>
              <Route path="/" element={user ? <Home/> : <Login/>}/>
              <Route path="/login" element={!user ? <Login/> : <Home/>}/>
              <Route path="/signup"  element={!user ? <Signup/> : <Home/>}/>
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </div>
    </div>
  );
}

export default App;
