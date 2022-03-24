const LETTER_LENGTH = 5;

interface WordRowProps {
    letters: string;
}

function WordRow({letters: lettersProp =""}: WordRowProps) {
    const lettersRemaining = LETTER_LENGTH - lettersProp.length;
    //make new array with empty letters if not enought submitter
    const letters = lettersProp.split('').concat(Array(lettersRemaining).fill(''))
    return (    
    <div className= "grid grid-cols-5 gap-4">
        {letters.map((char) => (
            <CharacterCubes key={char} value={char} />
        ))}
    </div>
    )
}

interface CharacterBoxProps {
    value :string;
}

function CharacterCubes ({value} : CharacterBoxProps) {
    return(
    <div className="inline-block border-2 mx-1 border-solid border-gray-500 p-4 uppercase text-lg font-bold text-center">
        {value}
    </div>
    )
}

export default WordRow