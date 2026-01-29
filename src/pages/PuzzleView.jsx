import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import puzzles from '../data/puzzles.json';
import { useProgress } from '../hooks/useProgress';
import { ArrowLeft, Lightbulb, CheckCircle, Eye, EyeOff, BookOpen, SkipForward } from 'lucide-react';
import clsx from 'clsx';

function PuzzleView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const puzzleIndex = puzzles.findIndex(p => p.id === id);
    const puzzle = puzzles[puzzleIndex];

    const { markSolved, isSolved } = useProgress();
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [notes, setNotes] = useState('');

    // Reset state when puzzle changes
    useEffect(() => {
        setShowHint(false);
        setShowSolution(false);
        setNotes('');
    }, [id]);

    if (!puzzle) {
        return <div className="p-8 text-center text-3xl font-black">Puzzle not found! 😕</div>;
    }

    const nextPuzzle = puzzleIndex < puzzles.length - 1 ? puzzles[puzzleIndex + 1] : null;

    const handleMarkSolved = () => {
        markSolved(puzzle.id);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
            <Link to="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:-translate-x-1 transition-transform border-b-2 border-transparent hover:border-neo-black">
                <ArrowLeft className="w-5 h-5" /> Back to Puzzles
            </Link>

            <div className="card-neo mb-8 relative bg-white">
                <div className="flex justify-between items-start mb-4">
                    <span className={clsx(
                        "text-sm font-black uppercase px-3 py-1 border-2 border-neo-black rounded bg-white shadow-neo-sm",
                        puzzle.difficulty === 'Easy' && "text-green-600",
                        puzzle.difficulty === 'Medium' && "text-yellow-600",
                        puzzle.difficulty === 'Hard' && "text-red-600",
                    )}>
                        {puzzle.difficulty}
                    </span>
                    {isSolved(puzzle.id) && (
                        <span className="flex items-center gap-1 text-neo-blue font-black">
                            <CheckCircle className="fill-current stroke-neo-black" /> Solved
                        </span>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight decoration-wavy underline-offset-4">
                    {puzzle.title}
                </h1>

                <div className="prose prose-xl prose-p:text-neo-black prose-p:font-medium max-w-none mb-8">
                    <p>{puzzle.description}</p>
                </div>

                <hr className="border-2 border-neo-black border-dashed mb-8 opacity-20" />

                <div className="mb-6">
                    <label className="block font-black text-lg mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Your Reasoning Notes
                    </label>
                    <textarea
                        className="w-full p-4 border-2 border-neo-black rounded-base shadow-neo-sm focus:shadow-neo transition-all outline-none font-medium text-lg min-h-[150px] resize-y bg-yellow-50"
                        placeholder="Type your thoughts here... (e.g. 'If I pick door 1...')"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className={clsx(
                            "btn-neo flex items-center gap-2",
                            showHint ? "bg-neo-yellow" : "bg-white"
                        )}
                    >
                        <Lightbulb className="w-5 h-5" /> {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>

                    <button
                        onClick={() => setShowSolution(!showSolution)}
                        className={clsx(
                            "btn-neo flex items-center gap-2",
                            showSolution ? "bg-neo-pink text-white border-neo-black" : "bg-white"
                        )}
                    >
                        {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                </div>

                {showHint && (
                    <div className="bg-neo-yellow/20 p-6 border-2 border-neo-black rounded-base mb-6 animate-in slide-in-from-top-2">
                        <h3 className="font-black text-lg mb-2">💡 Hint</h3>
                        <p className="font-bold opacity-80">{puzzle.hint}</p>
                    </div>
                )}

                {showSolution && (
                    <div className="bg-neo-blue/20 p-6 border-2 border-neo-black rounded-base mb-8 animate-in slide-in-from-top-2">
                        <h3 className="font-black text-lg mb-2">🚀 Solution</h3>
                        <div className="font-bold opacity-90 whitespace-pre-wrap">{puzzle.solution}</div>

                        {!isSolved(puzzle.id) && (
                            <div className="mt-6 pt-6 border-t-2 border-neo-black/10">
                                <button
                                    onClick={handleMarkSolved}
                                    className="w-full btn-neo bg-neo-blue text-neo-black border-neo-black hover:bg-neo-blue/80"
                                >
                                    Mark as Understood & Solved
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div>
                    {/* Placeholder for prev button if needed */}
                </div>
                {nextPuzzle && (
                    <Link
                        to={`/puzzle/${nextPuzzle.id}`}
                        className="btn-neo bg-neo-black text-white hover:bg-gray-800 flex items-center gap-2"
                    >
                        Next Puzzle <SkipForward className="w-5 h-5" />
                    </Link>
                )}
            </div>
        </div>
    );
}

export default PuzzleView;
