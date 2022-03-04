import "./App.css";

//import Dashboard from "./Dashboard";
import Dashboard from "./Dashboard";
import SignInSide from "./Login Components/SignInSide";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Login Components/SignUp";

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
