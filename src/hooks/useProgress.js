import { useState, useEffect } from 'react';

export function useProgress() {
    const [solvedIds, setSolvedIds] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('logicmaster_solved');
        if (saved) {
            setSolvedIds(JSON.parse(saved));
        }
    }, []);

    const markSolved = (id) => {
        if (!solvedIds.includes(id)) {
            const newSolved = [...solvedIds, id];
            setSolvedIds(newSolved);
            localStorage.setItem('logicmaster_solved', JSON.stringify(newSolved));
        }
    };

    const isSolved = (id) => solvedIds.includes(id);

    return { solvedIds, markSolved, isSolved };
}
