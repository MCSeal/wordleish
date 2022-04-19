import { useState } from 'react';

function Scoreboard(props) {
  const [name, setName] = useState('');
  const winStreak = props.winStreak;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch('http://localhost:5000/', {
      method: 'post',
      body: JSON.stringify({ name, winStreak }),
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
      <h2>High Scores!</h2>
      <div>Current Streak: {winStreak}, Lowest Winning Guess: 3</div>
      <form>
        <input
          className="text-center"
          type="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" onClick={handleOnSubmit}>
          submit
        </button>
      </form>
      <li>Current. Name - Spree - Lowest Guess: #</li>
      <li>1. Mathew - Spree: 4 - Lowest Guess: 1</li>
      <li>2. Nick - Spree: 2 - Lowest Guess: 4</li>
    </div>
  );
}

export default Scoreboard;
