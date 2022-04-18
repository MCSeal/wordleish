import { useState } from 'react'


function Scoreboard() {

  return (
    <div className=" ">
    <h2>High Scores!</h2>
        <input className="text-center"type="name" placeholder="Enter Name" />
        <li>Current. Name - Spree - Lowest Guess: #</li>
        <li>1. Mathew - Spree: 4 - Lowest Guess: 1</li>
        <li>2. Nick - Spree: 2 - Lowest Guess: 4</li>
    </div>
  )
}

export default Scoreboard
