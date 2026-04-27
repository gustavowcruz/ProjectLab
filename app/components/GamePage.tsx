"use client";

import { useState } from "react";
import Image from "next/image";
import { GameData, Review } from "@/app/types";
import ScoreBadge from "./ScoreBadge";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

interface GamePageProps {
  game: GameData;
}

export default function GamePage({ game }: GamePageProps) {
  const [reviews, setReviews] = useState<Review[]>(game.reviews);
  const [sortBy, setSortBy] = useState<"recent" | "score_asc" | "score_desc">(
    "recent"
  );
  const [showForm, setShowForm] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [heroError, setHeroError] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "score_asc") return a.score - b.score;
    if (sortBy === "score_desc") return b.score - a.score;
    return b.id.localeCompare(a.id);
  });

  const avgScore =
    reviews.length > 0
      ? Math.round(reviews.reduce((s, r) => s + r.score, 0) / reviews.length)
      : 0;

  function handleNewReview(review: Review) {
    setReviews((prev) => [review, ...prev]);
    setShowForm(false);
  }

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
          <div className="w-9 h-9 bg-green-500 rounded-full flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-green-300 transition-all flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
        {!heroError ? (
          <Image
            src={game.heroImage}
            alt={game.title}
            fill
            className="object-cover object-center"
            onError={() => setHeroError(true)}
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-indigo-900 via-purple-900 to-[#0d0d1a]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        {/* Game Header Card */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Cover */}
          <div className="shrink-0">
            <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-xl overflow-hidden border-2 border-gray-400 shadow-2xl bg-gray-200 relative">
              {!coverError ? (
                <Image
                  src={game.coverImage}
                  alt={`${game.title} cover`}
                  fill
                  className="object-cover"
                  onError={() => setCoverError(true)}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-b from-gray-400 to-gray-600 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-white font-black text-xl leading-tight">
                    {game.title}
                  </span>
                  <span className="text-indigo-300 text-xs mt-1">
                    {game.subtitle}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 sm:pt-20">
            <div className="flex flex-wrap gap-2 mb-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs bg-gray-800/60 text-gray-300 border border-gray-700/50 px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}  
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {game.title}
            </h1>
            <h2 className="text-xl text-gray-300 font-semibold mb-2">
              {game.subtitle}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-3">
              <span>
                <span className="text-gray-500">Dev:</span>{" "}
                <span className="text-gray-200">{game.developer}</span>
              </span>
              <span>
                <span className="text-gray-500">Publisher:</span>{" "}
                <span className="text-gray-200">{game.publisher}</span>
              </span>
              <span>
                <span className="text-gray-500">Lançamento:</span>{" "}
                <span className="text-gray-200">{game.releaseDate}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map((p) => (
                <span
                  key={p}
                  className="text-xs bg-gray-600 text-gray-100 border border-gray-500 px-2.5 py-1 rounded-lg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scores Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-center gap-4">
            <ScoreBadge score={game.criticScore} size="lg" />
            <div>
              <div className="text-white font-bold text-base">
                Nota da Crítica
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                Baseado em avaliações da imprensa especializada
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-center gap-4">
            <ScoreBadge score={avgScore} size="lg" />
            <div>
              <div className="text-white font-bold text-base">
                Média do Site
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                Média de {reviews.length} avaliações publicadas aqui
              </div>
            </div>
          </div>
        </div>

        {/* Score Distribution Bar */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Distribuição de notas
          </h3>
          <div className="space-y-1.5">
            {[
              {
                label: "Excelente (90-100)",
                color: "bg-green-500",
                min: 90,
                max: 100,
              },
              { label: "Bom (75-89)", color: "bg-green-400", min: 75, max: 89 },
              {
                label: "Regular (50-74)",
                color: "bg-yellow-500",
                min: 50,
                max: 74,
              },
              { label: "Ruim (0-49)", color: "bg-red-500", min: 0, max: 49 },
            ].map(({ label, color, min, max }) => {
              const count = reviews.filter(
                (r) => r.score >= min && r.score <= max
              ).length;
              const pct =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-36 shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className={`${color} h-2 rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-white mb-2">Sobre o Jogo</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h2 className="text-xl font-black text-white">
              Avaliações{" "}
              <span className="text-gray-500 font-normal text-base">
                ({reviews.length})
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "recent" | "score_asc" | "score_desc"
                  )
                }
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gray-600"
              >
                <option value="recent">Mais Recentes</option>
                <option value="score_desc">Maior Nota</option>
                <option value="score_asc">Menor Nota</option>
              </select>
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Avaliar
              </button>
            </div>
          </div>

          {/* Inline form */}
          {showForm && (
            <div className="mb-6">
              <ReviewForm onSubmit={handleNewReview} />
            </div>
          )}

          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-sm">
                Seja o primeiro a avaliar este jogo!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 text-center text-xs text-gray-400">
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
