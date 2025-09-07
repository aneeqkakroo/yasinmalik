import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "./ui.jsx";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Yasin Malik" },

  // 3rd item: dropdown
  {
    label: "Engagements",
    children: [
      { to: "/engagements/political", label: "Political Engagement" },
      { to: "/engagements/diplomatic", label: "Diplomatic Engagement" },
      { to: "/engagements/social", label: "Social Engagement" },
    ],
  },

  { to: "/media", label: "Media Archives" },
  { to: "/resources", label: "Resources" },
  { to: "/get-involved", label: "Get Involved", cta: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileEngOpen, setMobileEngOpen] = useState(false);
  const [engOpen, setEngOpen] = useState(false); // desktop dropdown
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 py-6 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <Container className="flex items-center justify-between py-3">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl"
          aria-label="Go to home"
        >
          <img
            src="/YM.png"
            alt="Justice for Yasin Malik logo"
            width="30"
            height="30"
            className="rounded-lg"
            style={{ filter: "brightness(0.9) sepia(0.3) saturate(2) hue-rotate(-20deg)" }}
          />
          <div className="font-bold text-white">Justice for Yasin Malik</div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80" aria-label="Primary">
          {navItems.map((item, i) => {
            if (item.children) {
              return (
                <div
                  key={`dropdown-${i}`}
                  className="relative"
                  onMouseEnter={() => setEngOpen(true)}
                  onMouseLeave={() => setEngOpen(false)}
                  onFocus={() => setEngOpen(true)}           // keyboard
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setEngOpen(false);
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-1"
                    aria-haspopup="menu"
                    aria-expanded={engOpen}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 opacity-80 transition ${engOpen ? "rotate-180 opacity-100" : ""}`} />
                  </button>

                  {/* Menu: no gap → top-full; state controls visibility */}
                  <div
                    role="menu"
                    className={`absolute right-0 top-full min-w-[220px] rounded-xl border border-white/10 bg-black/90 backdrop-blur p-2 z-50 transition
                                ${engOpen ? "visible opacity-100 translate-y-1" : "invisible opacity-0 -translate-y-1"}`}
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm hover:bg-white/10 hover:text-white transition ${
                            isActive ? "text-white" : ""
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.cta) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="ml-2 inline-flex items-center rounded-xl bg-white text-black px-3 py-1.5 text-sm font-semibold hover:bg-white/90 transition"
                >
                  {item.label}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `hover:text-white transition ${isActive ? "text-white font-medium" : ""}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
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

      {/* Mobile Menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-black/95">
          <Container className="py-2">
            <nav className="flex flex-col" aria-label="Mobile">
              {navItems.map((item, i) => {
                if (item.children) {
                  return (
                    <div key={`m-dropdown-${i}`} className="py-1">
                      <button
                        onClick={() => setMobileEngOpen((v) => !v)}
                        className="w-full flex items-center justify-between py-3 text-base text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg"
                        aria-expanded={mobileEngOpen}
                        aria-controls="mobile-engagements"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-5 w-5 transition ${mobileEngOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileEngOpen && (
                        <div id="mobile-engagements" className="pl-3">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={() => setOpen(false)}
                              className="block py-2.5 text-base text-white/80 hover:text-white rounded-lg"
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.cta) {
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="mt-1 mb-2 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-3 text-base font-semibold hover:bg-white/90 transition"
                    >
                      {item.label}
                    </NavLink>
                  );
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="py-3 text-base text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg"
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </Container>
        </div>
      )}
    </div>
  );
}
