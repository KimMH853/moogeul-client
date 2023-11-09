import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Routes/Home";
import Report from "./Routes/Report";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Report />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
