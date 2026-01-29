import React from 'react';
import puzzles from '../data/puzzles.json';
import PuzzleCard from '../components/PuzzleCard';
import { useProgress } from '../hooks/useProgress';
import { Brain, Trophy } from 'lucide-react';

function Home() {
    const { solvedIds } = useProgress();
    const [filter, setFilter] = React.useState('All');

    const filteredPuzzles = puzzles.filter(p =>
        filter === 'All' ? true : p.difficulty === filter
    );

    const categories = ['All', 'Easy', 'Medium', 'Hard'];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header / Intro */}
            <header className="mb-12 text-center">
                <div className="inline-block p-4 rounded-full bg-neo-pink border-4 border-neo-black shadow-neo-lg mb-6 rotate-3 hover:rotate-6 transition-transform">
                    <Brain className="w-16 h-16 text-white stroke-[2.5]" />
                </div>
                <h1 className="text-6xl font-black mb-4 tracking-tight drop-shadow-md">
                    Logic<span className="text-neo-pink">Master</span>
                </h1>
                <p className="text-xl font-bold opacity-80 max-w-lg mx-auto mb-8 leading-relaxed">
                    Sharpen your mind with the world's most famous logic puzzles.
                    No multiple choice. Just you and the problem.
                </p>

                <div className="card-neo inline-flex items-center gap-4 bg-neo-blue text-neo-black mx-auto transform -rotate-2">
                    <Trophy className="w-8 h-8 stroke-2" />
                    <div className="text-left">
                        <span className="block text-xs font-black uppercase tracking-wider">Progress</span>
                        <span className="text-2xl font-black">{solvedIds.length} / {puzzles.length} Solved</span>
                    </div>
                </div>
            </header>

            {/* Puzzle Grid */}
            <main>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                    <div className="h-4 flex-1 bg-neo-black rounded-full hidden md:block" />

                    <div className="flex gap-2 bg-white p-2 rounded-xl border-4 border-neo-black shadow-neo transform -rotate-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                                    px-4 py-2 font-bold rounded-lg transition-all border-2
                                    ${filter === cat
                                        ? 'bg-neo-black text-white border-neo-black shadow-none'
                                        : 'bg-transparent text-neo-black border-transparent hover:bg-gray-100'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="h-4 flex-1 bg-neo-black rounded-full hidden md:block" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPuzzles.map(puzzle => (
                        <PuzzleCard
                            key={puzzle.id}
                            puzzle={puzzle}
                            isSolved={solvedIds.includes(puzzle.id)}
                        />
                    ))}
                </div>
            </main>

            <footer className="mt-20 text-center font-bold opacity-50">
                built with brainpower 🧠
            </footer>
        </div>
    );
}

export default Home;
