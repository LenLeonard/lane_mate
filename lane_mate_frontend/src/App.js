import "./App.css";

//import Dashboard from "./Dashboard";
import Dashboard from "./newDashboard";
import SignInSide from "./SignInSide";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
