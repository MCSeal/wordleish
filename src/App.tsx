import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import WordRow from './WordRow.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="mx-auto w-96">
    <header className="border-b border-purple-500 pb-4 my-2"><h1 className="text-4xl text-center">Worldeish</h1></header>
      <main>
        <WordRow letters="hel"/>
      </main>
    </div>
  )
}

export default App
