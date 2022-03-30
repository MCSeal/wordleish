import { useState } from 'react'
import './App.css'
import WordRow from './WordRow'
import { useStore, Guess_Length } from './store'
import { LETTER_LENGTH } from './word-utils'





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



  let rows = [...state.rows];

  
    if (rows.length < Guess_Length){
      rows.push({ guess });
    };
    const numberOfGuessesRemaining = Guess_Length - rows.length;
    
  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));
  
  
    const isGameOver = state.gameState !== 'playing';

  
  
  
  return (
    <div className="mx-auto w-96 relative">
    <header className="border-b border-purple-500 pb-4 my-2"><h1 className="text-4xl text-center">Worldeish</h1>
    
    
    <div>
      <input type="text" className="w-2/3 p-1 border-2 ml-auto mr-auto flex text-center" placeholder='Enter Guess Here!'value={guess} onChange={onChange} disabled={isGameOver} />
    </div>
    </header>
      
      
      
      <main className="grid grid-rows-6 gap-6">
        {rows.map(({guess, result}, index) => (
          <WordRow key={index} letters={guess} result={result}/>
        ))}
       

      </main>
      
      {isGameOver && (
        <div role="modal" className="absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded border border-purple-900 text-center">
          Game Over!
          
          <button className="block border rounded border-grey-600 bg-purple-700 left-0 right-0 p-2 mt-4 mx-auto shadow" onClick={() => {
            state.newGame();
            setGuess('');
          }}>New Game? </button> 
        </div>
      )}
    </div>
  )
}

export default App
