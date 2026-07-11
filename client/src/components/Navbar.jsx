function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">
          🏟 Smart Stadium AI
        </h1>

        <div className="space-x-8">
          <a href="#" className="hover:text-cyan-400">
            Home
          </a>

          <a href="#" className="hover:text-cyan-400">
            Dashboard
          </a>

          <a href="#" className="hover:text-cyan-400">
            Features
          </a>

          <a href="#" className="hover:text-cyan-400">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;