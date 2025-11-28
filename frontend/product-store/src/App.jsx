import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Create from "./Pages/Create.jsx";
import HomePage from "./Pages/HomePage.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
