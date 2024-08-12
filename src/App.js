import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formation from "./components/navigation/formation/Formation";
import Personnel from "./components/navigation/personnel/Personnel";
import Planifier from "./components/navigation/planifier/Panifier";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/planifier" element={<Planifier />} />
        </Routes>
      </Router>
    </div>
  );
}
// npm install material-table --save --legacy-peer-deps --force

export default App;
