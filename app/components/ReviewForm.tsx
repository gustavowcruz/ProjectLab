"use client";

import { useState } from "react";
import { Review } from "@/app/types";

interface ReviewFormProps {
  onSubmit: (review: Review) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(80);
  const [platform, setPlatform] = useState("PC");
  const [submitted, setSubmitted] = useState(false);

  function getScoreColor(s: number): string {
    if (s >= 75) return "text-green-400";
    if (s >= 50) return "text-yellow-400";
    return "text-red-400";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;

    const initials = author
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newReview: Review = {
      id: Date.now().toString(),
      author: author.trim(),
      avatar: initials,
      score,
      title: title.trim() || "Minha avaliação",
      body: body.trim(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      platform,
      helpful: 0,
    };

    onSubmit(newReview);
    setAuthor("");
    setTitle("");
    setBody("");
    setScore(80);
    setPlatform("PC");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Escrever uma Avaliação
      </h3>

      {submitted && (
        <div className="mb-4 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Avaliação enviada com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Seu nome <span className="text-gray-500">*</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: João Silva"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Plataforma
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
            >
              <option value="PC">PC</option>
              <option value="PS5">PS5</option>
              <option value="Xbox Series X/S">Xbox Series X/S</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Título da avaliação
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resumo da sua experiência"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Sua avaliação <span className="text-gray-500">*</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Compartilhe sua experiência com o jogo..."
            required
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
          />
        </div>

        {/* Score slider */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nota:{" "}
            <span className={`font-black text-lg ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-gray-500 text-xs ml-1">/100</span>
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-bold">0</span>
            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="flex-1 h-2 appearance-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${
                  score >= 75 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444"
                } ${score}%, #4b5563 ${score}%)`,
              }}
            />
            <span className="text-xs text-gray-500 font-bold">100</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Péssimo</span>
            <span>Ruim</span>
            <span>Regular</span>
            <span>Bom</span>
            <span>Excelente</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Publicar Avaliação
        </button>
      </form>
    </div>
  );
}
