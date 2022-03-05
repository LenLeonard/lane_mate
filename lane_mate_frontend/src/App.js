import "./App.css";

//import Dashboard from "./Dashboard";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignInSide from "./Components/Login/SignInSide";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
