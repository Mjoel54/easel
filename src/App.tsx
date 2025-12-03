import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  AboutPage,
  BannersPage,
  EditorPage,
  SubheadingsPage,
  LayoutsPage,
} from "./pages/index.js";
import { Footer, Layout } from "./components/index.js";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/banners" element={<BannersPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/subheadings" element={<SubheadingsPage />} />
          <Route path="/layouts" element={<LayoutsPage />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
