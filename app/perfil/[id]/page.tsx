"use client";

import Link from "next/link";

interface PerfilProps {
  params: {
    id: string;
  };
}

export default function PerfilUsuario({ params }: PerfilProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top nav bar */}
      <nav className="bg-gray-800 shadow-2xl shadow-white/10 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-black text-white text-xl hidden sm:block bg-green-600 px-3 py-1.5 rounded-md">
              GameLog
            </span>
            <div className="hidden sm:block w-px h-6 bg-gray-700" />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar jogos..."
              className="w-full bg-white border-0 rounded-lg px-4 py-2.5 pl-10 text-base text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-base font-bold text-white">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-white"
            >
              Jogos
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-white"
            >
              Reviews
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-white"
            >
              Listas
            </a>
          </div>

          {/* Profile Circle */}
          <Link href="/perfil/1">
            <div className="w-9 h-9 bg-green-500 rounded-full flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-green-300 transition-all flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
          </Link>
        </div>
      </nav>

      {/* Profile Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Left: Avatar & User Info */}
          <div className="flex flex-col items-center sm:items-start gap-6 flex-shrink-0">
            {/* Avatar */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
                serialexperimentssgstv
              </h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 justify-center sm:justify-start">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Entrou em jun. de 2025
              </div>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Editar perfil
              </button>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-2 gap-4">
            {/* Avaliações */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center hover:border-gray-600 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                3
              </div>
              <div className="text-sm text-gray-400">Avaliações</div>
            </div>

            {/* Lista para assistir */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center hover:border-gray-600 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                31
              </div>
              <div className="text-sm text-gray-400">Lista para assistir</div>
            </div>

            {/* Listas */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center hover:border-gray-600 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                4
              </div>
              <div className="text-sm text-gray-400">Listas</div>
            </div>

            {/* Mais */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center hover:border-gray-600 cursor-pointer transition-colors hover:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-400 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM9 9h6m-6 4h6m-5 5h4"
                />
              </svg>
              <div className="text-sm text-gray-400">Mais</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 text-center text-xs text-gray-400 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p>
            © 2025 Gamelog — Uma plataforma de críticas e avaliações de jogos
            eletrônicos
          </p>
        </div>
      </footer>
    </div>
  );
}