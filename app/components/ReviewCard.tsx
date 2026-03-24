import { Review } from "@/app/types";
import ScoreBadge from "./ScoreBadge";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
          {review.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <div>
              <span className="text-white font-semibold">{review.author}</span>
              <span className="ml-2 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                {review.platform}
              </span>
            </div>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>

          <h4 className="text-gray-100 font-semibold text-sm mb-2">
            {review.title}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">{review.body}</p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 1.977l-4.477 6.11A2 2 0 007 12.5V20"
                />
              </svg>
              Útil ({review.helpful})
            </button>
            <ScoreBadge score={review.score} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
