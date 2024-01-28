import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Register from "./login/Register";
function App() {
  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"background": '#323433'}}>
       <Routes>
        <Route path='login' element={ <Login/>}/>
        <Route path='register' element={<Register/>}/>
       </Routes>
    </div>
  );
}

export default App;
