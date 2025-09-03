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
    <div className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <Container className="flex items-center justify-between py-3">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl"
          aria-label="Go to home"
        >
          {/* <div className="h-9 w-9 rounded-xl bg-rose-600" /> */}
          <img
            src={"/YM.png"}
            alt="Save Yasin Malik logo"
            width="30"
            height="30"
            className="rounded-lg"
            style={{
              filter:
                "brightness(0.9) sepia(0.3) saturate(2) hue-rotate(-20deg)",
            }}
          />
          <div className="font-bold text-white">Save Yasin Malik</div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80" aria-label="Primary">
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
            className="ml-2 inline-flex items-center rounded-xl bg-white text-black px-3 py-1.5 text-sm font-semibold hover:bg-white/90 transition"
          >
            Act Now
          </NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white -mr-2 inline-flex items-center justify-center p-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {/* Mobile Menu (safe sheet + bigger tap targets) */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-white/10 bg-black/95"
        >
          <Container className="py-2">
            <nav className="flex flex-col" aria-label="Mobile">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg"
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/get-involved"
                onClick={() => setOpen(false)}
                className="mt-1 mb-2 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-3 text-base font-semibold hover:bg-white/90 transition"
              >
                Act Now
              </NavLink>
            </nav>
          </Container>
        </div>
      )}
    </div>
  );
}
