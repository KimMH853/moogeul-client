import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Routes/Home";
import Report from "./Routes/Report";
import "./App.css";
import Header from "./Components/Header";

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
