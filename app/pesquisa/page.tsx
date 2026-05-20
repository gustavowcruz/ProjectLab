"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ScoreBadge from "@/app/components/ScoreBadge";
import { clairObscurData } from "@/app/data/gameData";

interface SearchGame {
  id: string;
  title: string;
  subtitle?: string;
  developer: string;
  releaseDate: string;
  platforms: string[];
  genres: string[];
  score: number;
  description: string;
}

const games: SearchGame[] = [
  {
    id: clairObscurData.id,
    title: `${clairObscurData.title}: ${clairObscurData.subtitle}`,
    subtitle: clairObscurData.subtitle,
    developer: clairObscurData.developer,
    releaseDate: clairObscurData.releaseDate,
    platforms: clairObscurData.platforms,
    genres: clairObscurData.genres,
    score: clairObscurData.userScore,
    description: clairObscurData.description,
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    subtitle: "The Lands Between",
    developer: "FromSoftware",
    releaseDate: "25 de Fevereiro de 2022",
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    genres: ["RPG", "Soulslike", "Mundo Aberto"],
    score: 96,
    description:
      "Um RPG de ação em mundo aberto onde o jogador explora as Terras Intermédias, enfrenta chefes desafiadores e busca se tornar o Lorde Prístino.",
  },
  {
    id: "resident-evil-4-remake",
    title: "Resident Evil 4 Remake",
    subtitle: "Survival Horror",
    developer: "Capcom",
    releaseDate: "24 de Março de 2023",
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    genres: ["Terror", "Ação", "Sobrevivência"],
    score: 93,
    description:
      "Reimaginação moderna do clássico de 2005, acompanhando Leon S. Kennedy em uma missão de resgate em uma vila isolada.",
  },
  {
    id: "god-of-war-ragnarok",
    title: "God of War Ragnarök",
    subtitle: "A jornada de Kratos e Atreus",
    developer: "Santa Monica Studio",
    releaseDate: "9 de Novembro de 2022",
    platforms: ["PS5", "PS4", "PC"],
    genres: ["Ação", "Aventura", "Narrativo"],
    score: 94,
    description:
      "Kratos e Atreus enfrentam o Fimbulwinter e os deuses nórdicos em uma aventura focada em combate, narrativa e exploração.",
  },
  {
    id: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    subtitle: "Caçada Selvagem",
    developer: "CD Projekt Red",
    releaseDate: "19 de Maio de 2015",
    platforms: ["PC", "PS5", "Xbox Series X/S", "Switch"],
    genres: ["RPG", "Fantasia", "Mundo Aberto"],
    score: 95,
    description:
      "Geralt de Rívia procura Ciri em um mundo aberto rico em decisões, contratos de monstros e histórias secundárias marcantes.",
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    subtitle: "Night City",
    developer: "CD Projekt Red",
    releaseDate: "10 de Dezembro de 2020",
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    genres: ["RPG", "Ficção Científica", "Mundo Aberto"],
    score: 86,
    description:
      "Um RPG futurista ambientado em Night City, onde V busca sobreviver após entrar em contato com um biochip experimental.",
  },
];

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function GameIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 12h4m-2-2v4m6-1h.01M18 11h.01M7 18h10a4 4 0 003.95-4.66l-.7-4.2A4 4 0 0016.3 6H7.7a4 4 0 00-3.95 3.14l-.7 4.2A4 4 0 007 18z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedGame, setSelectedGame] = useState<SearchGame | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const normalizedSubmittedQuery = submittedQuery.trim().toLowerCase();

  const suggestedGames = useMemo(() => {
    if (!normalizedQuery) return [];

    return games
      .filter((game) =>
        `${game.title} ${game.developer} ${game.genres.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery)
      )
      .slice(0, 5);
  }, [normalizedQuery]);

  const filteredGames = useMemo(() => {
    if (!normalizedSubmittedQuery) return [];

    return games.filter((game) =>
      `${game.title} ${game.developer} ${game.genres.join(" ")}`
        .toLowerCase()
        .includes(normalizedSubmittedQuery)
    );
  }, [normalizedSubmittedQuery]);

  function performSearch(query = searchQuery) {
    const cleanQuery = query.trim();
    setSubmittedQuery(cleanQuery);
    setSearchQuery(cleanQuery);
    setShowSuggestions(false);
  }

  function clearSearch() {
    setSearchQuery("");
    setSubmittedQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 shadow-2xl shadow-white/10 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <span className="font-black text-white text-xl hidden sm:block bg-green-600 px-3 py-1.5 rounded-md">
              GameLog
            </span>
            <div className="hidden sm:block w-px h-6 bg-gray-700" />
          </Link>

          <div className="flex-1 max-w-xl relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowSuggestions(event.target.value.trim().length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
              onKeyDown={(event) => {
                if (event.key === "Enter") performSearch();
              }}
              placeholder="Buscar jogos..."
              className="w-full bg-white border-0 rounded-lg px-4 py-2.5 pl-10 pr-20 text-base text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Limpar busca"
              >
                <CloseIcon />
              </button>
            )}

            <button
              type="button"
              onClick={() => performSearch()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1.5 text-sm font-bold transition-colors"
            >
              Buscar
            </button>

            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-700 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Sugestões de jogos
                </div>

                {suggestedGames.length > 0 ? (
                  suggestedGames.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => performSearch(game.title)}
                      className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                    >
                      <div className="w-12 h-14 rounded-lg bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-400 flex-shrink-0">
                        <GameIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{game.title}</p>
                        <p className="text-xs text-gray-400 truncate">{game.developer}</p>
                      </div>
                      <ScoreBadge score={game.score} size="sm" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400">
                    <SearchIcon className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                    <p className="font-semibold text-white">Nenhuma sugestão encontrada</p>
                    <p className="text-sm mt-1">Tente buscar por outro jogo, gênero ou estúdio.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 text-base font-bold text-white">
            <Link href="/" className="hover:text-white transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-white">
              Jogos
            </Link>
            <a href="#resultados" className="hover:text-white transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-white">
              Resultados
            </a>
            <Link href="/perfil/1" className="w-9 h-9 bg-green-500 rounded-full flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-green-300 transition-all flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <p className="text-sm text-green-400 font-bold uppercase tracking-wider mb-2">
            Pesquisa
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Encontre jogos avaliados pela comunidade
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Busque por título, gênero ou estúdio. Esta tela usa dados temporários no front-end e está pronta para ser conectada à API depois.
          </p>
        </section>

        <section id="resultados">
          {submittedQuery ? (
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div>
                <h2 className="text-xl font-black text-white">
                  Resultados para "{submittedQuery}"
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {filteredGames.length} jogo(s) encontrado(s)
                </p>
              </div>
              <button
                type="button"
                onClick={clearSearch}
                className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Nova busca
              </button>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                <SearchIcon className="w-10 h-10 text-gray-600" />
              </div>
              <h2 className="text-2xl font-black text-white">Digite algo para pesquisar</h2>
              <p className="text-sm mt-2 max-w-md mx-auto">
                Exemplos: Clair Obscur, RPG, Capcom, God of War ou Elden Ring.
              </p>
            </div>
          )}

          {submittedQuery && filteredGames.length === 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-10 text-center text-gray-400">
              <SearchIcon className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <h3 className="text-xl font-black text-white">Nenhum jogo encontrado</h3>
              <p className="text-sm mt-2">Verifique a escrita ou tente pesquisar por outro termo.</p>
            </div>
          )}

          {filteredGames.length > 0 && (
            <div className="space-y-4">
              {filteredGames.map((game) => (
                <article
                  key={game.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-28 h-36 rounded-xl bg-linear-to-b from-gray-700 to-gray-800 border border-gray-600 flex flex-col items-center justify-center text-gray-400 flex-shrink-0">
                      <GameIcon className="w-10 h-10 mb-2" />
                      <span className="text-xs font-bold text-gray-500">GameLog</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-2xl font-black text-white leading-tight">
                            {game.title}
                          </h3>
                          {game.subtitle && (
                            <p className="text-gray-400 font-semibold mt-0.5">{game.subtitle}</p>
                          )}
                        </div>
                        <ScoreBadge score={game.score} size="md" />
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-3">
                        <span>
                          <span className="text-gray-500">Dev:</span>{" "}
                          <span className="text-gray-200">{game.developer}</span>
                        </span>
                        <span>
                          <span className="text-gray-500">Lançamento:</span>{" "}
                          <span className="text-gray-200">{game.releaseDate}</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {game.genres.map((genre) => (
                          <span key={genre} className="text-xs bg-gray-700 text-gray-300 border border-gray-600 px-2 py-0.5 rounded-full">
                            {genre}
                          </span>
                        ))}
                        {game.platforms.map((platform) => (
                          <span key={platform} className="text-xs bg-gray-600 text-gray-100 border border-gray-500 px-2.5 py-1 rounded-lg">
                            {platform}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {game.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-5">
                        <button
                          type="button"
                          onClick={() => setSelectedGame(game)}
                          className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          Ver detalhes
                        </button>
                        <Link
                          href="/"
                          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          Abrir página do jogo
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar detalhes"
            >
              <CloseIcon />
            </button>

            <div className="flex items-start gap-5 pr-8">
              <div className="w-20 h-24 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-400 flex-shrink-0">
                <GameIcon />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white leading-tight">
                  {selectedGame.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{selectedGame.developer}</p>
                <div className="mt-4">
                  <ScoreBadge score={selectedGame.score} size="lg" />
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed bg-gray-900 border border-gray-700 rounded-xl p-4 mt-5">
              {selectedGame.description}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setSelectedGame(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Fechar
              </button>
              <Link
                href="/"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Ver página completa
              </Link>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 border-t border-gray-700 py-6 text-center text-xs text-gray-400">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2025 Gamelog — Pesquisa de jogos com dados temporários no front-end</p>
        </div>
      </footer>
    </div>
  );
}
