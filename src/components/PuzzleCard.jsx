import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

function PuzzleCard({ puzzle, isSolved }) {
    return (
        <div className={clsx(
            "card-neo transition-all duration-300 relative overflow-hidden group",
            isSolved ? "bg-neo-blue/10 border-neo-blue" : "hover:-rotate-1"
        )}>
            {isSolved && (
                <div className="absolute top-2 right-2 text-neo-blue">
                    <CheckCircle className="w-8 h-8 fill-current stroke-neo-black stroke-2" />
                </div>
            )}

            <div className="flex justify-between items-start mb-2">
                <span className={clsx(
                    "text-xs font-bold px-2 py-1 border-2 border-neo-black rounded bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                    puzzle.difficulty === 'Easy' && "text-green-600",
                    puzzle.difficulty === 'Medium' && "text-yellow-600",
                    puzzle.difficulty === 'Hard' && "text-red-600",
                )}>
                    {puzzle.difficulty}
                </span>
            </div>

            <h3 className="text-xl font-black mb-2 line-clamp-1 group-hover:underline decoration-2 underline-offset-2">
                {puzzle.title}
            </h3>

            <p className="text-sm font-medium opacity-70 mb-4 line-clamp-2">
                {puzzle.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {puzzle.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold bg-neo-pink text-white px-2 py-1 rounded border-2 border-neo-black">
                        #{tag}
                    </span>
                ))}
            </div>

            <Link
                to={`/puzzle/${puzzle.id}`}
                className="btn-neo w-full text-center flex items-center justify-center gap-2 group-hover:bg-neo-yellow"
            >
                {isSolved ? 'Review' : 'Solve It'} <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

export default PuzzleCard;
