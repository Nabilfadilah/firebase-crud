import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Write from "./components/Write";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Write />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
