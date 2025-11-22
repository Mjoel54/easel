import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import { Dashboard, Library } from "./pages/index.js";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
