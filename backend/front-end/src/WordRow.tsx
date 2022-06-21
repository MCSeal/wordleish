import { computeGuess, LetterState, LETTER_LENGTH } from './word-utils';
import { useStore } from './store';

interface WordRowProps {
  letters: string;
  result?: LetterState[];
}

function WordRow({ letters: lettersProp = '', result = [] }: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  //make new array with empty letters if not enought submitted, fixes issue of not adding everything
  const letters = lettersProp
    .split('')
    .concat(Array(lettersRemaining).fill(''));

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterCubes key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

function CharacterCubes({ value, state }: CharacterBoxProps) {
  const stateStyles = state == null ? '' : characterStateStyles[state];
  return (
    <div
      className={`inline-block border-2 mx-1 border-solid border-gray-500 p-4 uppercase text-lg font-bold text-center before:inline-block before:content-[' '] ${stateStyles}`}
    >
      {value}
    </div>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-gray-500 border-gray-500',
  [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
  [LetterState.Match]: 'bg-green-500 border-green-500',
};

export default WordRow;
