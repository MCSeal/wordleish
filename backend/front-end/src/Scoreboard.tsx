import { useState, useEffect } from 'react';
import ScoreboardItem from './ScoreboardItem';

function Scoreboard(props) {
  const [name, setName] = useState('');
  const [scoreboard, setScoreboard] = useState(['']);

  const winStreak = props.winStreak;
  const lowestWinStreak = props.lowestWinGuess;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch('https://wordleish-mern.herokuapp.com/', {
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

  const getScoreboard = async () => {
    let response = await fetch('https://wordleish-mern.herokuapp.com/');
    let result = await response.json();
    console.log(result);
    setScoreboard(result);
  };

  //useeffect to get the scoreboad data from the server
  useEffect(() => {
    getScoreboard();
  }, []);

  return (
    <div className=" ">
      <h2 className="text-xl mt-3 mb-6">High Scores</h2>
      <div className="mb-3">Current Streak: {winStreak}</div>
      <div className="mb-3">Lowest Winning Guess: {lowestWinStreak}</div>
      <form className="mb-7 border-b border-puple-500">
        <input
          className="text-center border-black border-2 p-1 m-2"
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

      <ScoreboardItem scoreboard={scoreboard} />
    </div>
  );
}

export default Scoreboard;
