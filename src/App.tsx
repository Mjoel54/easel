import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import { Dashboard, Banners } from "./pages/index.js";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/banners" element={<Banners />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
