import { Container } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="text-white font-bold">Free Yasin Malik</div>
            <div className="text-white/60 text-sm">
              Stories • Evidence • Action
            </div>
          </div>

          {/* Copyright */}
          <div className="text-white/60 text-sm">
            © {new Date().getFullYear()} • Use authorized materials. Cite sources.
          </div>
        </div>
      </Container>
    </footer>
  );
}
