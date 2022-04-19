import { useState } from 'react';

function Scoreboard(props) {
  const [name, setName] = useState('');
  const winStreak = props.winStreak;
  const lowestWinStreak = props.lowestWinGuess;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch('http://localhost:5000/', {
      method: 'post',
      body: JSON.stringify({ name, winStreak, lowestWinStreak }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert('Data saved successfully');
      setName('');
    }
  };

  return (
    <div className=" ">
      <h2 className="text-xl">High Scores</h2>
      <div>
        Current Streak: {winStreak}, Lowest Winning Guess: {lowestWinStreak}
      </div>
      <form>
        <input
          className="text-center"
          type="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="text-lg border-1 bg-yellow-500 border-yellow-500 p-1 m-2 rounded-lg hover:bg-green-500 active:bg-gray-500 align-content: center;"
          type="submit"
          onClick={handleOnSubmit}
        >
          Submit
        </button>
      </form>
      <li>Current. Name - Spree - Lowest Guess: #</li>
      <li>1. Mathew - Spree: 4 - Lowest Guess: 1</li>
      <li>2. Nick - Spree: 2 - Lowest Guess: 4</li>
    </div>
  );
}

export default Scoreboard;
