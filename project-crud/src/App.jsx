import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Write from "./components/Write";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Read />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
