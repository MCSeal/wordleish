import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import WordRow from './WordRow.tsx'
import { useStore } from './store'
import { LETTER_LENGTH } from './word-utils.ts'

const Guess_Length = 6;



function App() {
  const state = useStore();
  const [guess, setGuess] = useState('');  



  //on change handler
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;
    
    if (newGuess.length === LETTER_LENGTH){
      state.addGuess(newGuess);
      setGuess('');
      return;
    }
    
    setGuess(newGuess);
    
  }



  let rows = [...state.guesses];

  
    if (rows.length < Guess_Length){
      rows.push(guess);
    };
    const numberOfGuessesRemaining = Guess_Length - rows.length;
    
  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));
  
  return (
    <div className="mx-auto w-96">
    <header className="border-b border-purple-500 pb-4 my-2"><h1 className="text-4xl text-center">Worldeish</h1>
    
    
    <div>
      <input type="text" className="w-1/3 p-1 border-2" value={guess} onChange={onChange} />
    </div>
    </header>
      
      
      
      <main className="grid grid-rows-6 gap-6">
        {rows.map((word, index) => (
          <WordRow key={index} letters={word}/>
        ))}
       

      </main>
    </div>
  )
}

export default App
