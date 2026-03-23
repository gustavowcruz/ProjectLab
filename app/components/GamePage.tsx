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
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      {/* Top nav bar */}
      <nav className="bg-[#0a0a14] border-b border-gray-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-black">
              PL
            </div>
            <span className="font-bold text-white text-sm hidden sm:block">
              ProjectLab
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Jogos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Listas
            </a>
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
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-[#0d0d1a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        {/* Game Header Card */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Cover */}
          <div className="flex-shrink-0">
            <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl bg-gray-900 relative">
              {!coverError ? (
                <Image
                  src={game.coverImage}
                  alt={`${game.title} cover`}
                  fill
                  className="object-cover"
                  onError={() => setCoverError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-indigo-800 to-purple-900 flex flex-col items-center justify-center p-3 text-center">
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
                  className="text-xs bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {game.title}
            </h1>
            <h2 className="text-xl text-indigo-400 font-semibold mb-2">
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
                  className="text-xs bg-gray-800 text-gray-300 border border-gray-700 px-2.5 py-1 rounded-lg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scores Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
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

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
            <ScoreBadge score={game.userScore} size="lg" />
            <div>
              <div className="text-white font-bold text-base">
                Nota dos Usuários
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                {game.totalReviews.toLocaleString("pt-BR")} avaliações no total
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
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
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
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
                  <span className="text-xs text-gray-400 w-36 flex-shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
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
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
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
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="recent">Mais Recentes</option>
                <option value="score_desc">Maior Nota</option>
                <option value="score_asc">Menor Nota</option>
              </select>
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
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
      <footer className="bg-[#0a0a14] border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          <p>
            © 2025 ProjectLab — Uma plataforma de críticas e avaliações de jogos
            eletrônicos
          </p>
        </div>
      </footer>
    </div>
  );
}
