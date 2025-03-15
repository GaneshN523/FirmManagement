import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Department from "./pages/Departments/Department";
import "./App.css";
import Workers from "./pages/workers/Workers";
import Machinery from "./pages/machinery/Machinery";
import Accounts from "./pages/accounts/Accounts";
import LaboratoryDash from "./pages/laboratory/Laboratory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/workers" element={<Workers />} />  {/* ✅ Added missing route */}
        <Route path="/machinery" element={<Machinery />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/laboratory" element={<LaboratoryDash />} />
      </Routes>
    </Router>
  );
}

export default App;