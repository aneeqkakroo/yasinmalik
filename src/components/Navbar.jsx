import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "./ui.jsx";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Yasin Malik" },
  { to: "/engagements", label: "Political Engagements" },
  { to: "/media", label: "Media Archives" },
  { to: "/resources", label: "Resources" },
  { to: "/get-involved", label: "Get Involved" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >
          {/*<div className="h-9 w-9 rounded-xl bg-rose-600" />*/}
          <img 
            src={"/YM.png"} alt="Example" width="30" height="30" 
            style={{filter: "brightness(0.9) sepia(0.3) saturate(2) hue-rotate(-20deg)"}}
            />
          <div className="font-bold text-white">Save Yasin Malik</div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `hover:text-white transition ${
                  isActive ? "text-white font-medium" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/get-involved"
            className="ml-2 inline-flex items-center rounded-xl bg-white text-black px-3 py-1 text-sm font-semibold"
          >
            Act Now
          </NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/90">
          <Container className="py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block w-full py-2 text-white/90 hover:text-white"
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/get-involved"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-xl bg-white text-black px-3 py-1 text-sm font-semibold"
            >
              Act Now
            </NavLink>
          </Container>
        </div>
      )}
    </div>
  );
}
