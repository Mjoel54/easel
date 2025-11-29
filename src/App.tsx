import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./features/Layout.js";
import { About, Banners, Editor } from "./pages/index.js";
import { Footer } from "./features/index.js";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
