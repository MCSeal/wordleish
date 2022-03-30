import create from "zustand"
import { persist } from "zustand/middleware"
import { computeGuess, getRandomWord, LetterState } from './word-utils'


export const Guess_Length = 6;

interface GuessRow {
    guess: string;
    result?: LetterState[];
}

interface StoreState{
    answer: string;
    rows: GuessRow[];
    gameState: 'playing' | 'won' | 'lost';
    addGuess: (guess:string) => void;
    newGame: () => void
}

export const useStore = create<StoreState>(
    persist(
        (set, get) => ({
        answer: getRandomWord(),
        rows: [],
        gameState: 'playing',
        addGuess: (guess: string) => {
            const result = computeGuess(guess, get().answer);
            
            
            
            const didWin = result.every(i => i === LetterState.Match);
            const rows = [
                    ...get().rows, 
                    { 
                        guess,
                        result,
                    },
                ]
            set(() => ({
                rows,
                gameState: didWin ? 'won' : (rows.length === Guess_Length) ? 'lost' : 'playing',
            }));
        },
        newGame: () => {
            set({
                answer: getRandomWord(),
                rows: [],
                gameState: 'playing',
            })
        }
    }), {
        name: "wordleish",
    }
)
)
// useStore.persist.clearStorage();