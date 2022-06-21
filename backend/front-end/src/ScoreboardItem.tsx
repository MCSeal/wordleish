function ScoreboardItem(props) {
  // maps through scoreboard and displays name and high streak
  return (
    <div>
      {props.scoreboard.map(({ name, winStreak, lowestWinStreak }) => (
        <div className="border-b border-purple-500 pb-4 my-2">
          <h1 className="text-1xl text-center">{name}</h1>

          <div> Winstreak: {winStreak}</div>
          <div> Lowest Winning Guess: {lowestWinStreak}</div>
        </div>
      ))}
    </div>
  );
}

export default ScoreboardItem;
