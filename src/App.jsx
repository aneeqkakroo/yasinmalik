import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Political from "./pages/Political.jsx";
import Diplomatic from "./pages/Diplomatic.jsx";
import Social from "./pages/Social.jsx";
import Media from "./pages/Media.jsx";
import Resources from "./pages/Resources.jsx";
import GetInvolved from "./pages/GetInvolved.jsx";
import Bio from "./pages/Biography.jsx";

// Optional: simple 404 component
function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-white/70 mt-2">Page not found</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/engagements/political" element={<Political />} />
          <Route path="/engagements/social" element={<Social />} />
          <Route path="/engagements/diplomatic" element={<Diplomatic />} />
          <Route path="/media" element={<Media />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/biography" element={<Bio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
