import { useState } from "react";
import Button from "./Components/Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteState, changeVoteState] = useState(
    Array(anecdotes.length).fill(0)
  );
  const [maxVoteAnecdotes, setMaxVoteAnecdotes] = useState(0);

  const randumAnecdotesGenerator = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };
  const handleVoteClick = () => {
    const newVoteState = [...voteState];
    newVoteState[selected] += 1;
    //*If current anecdotes vote value is higher then max vote anecdotes then change max vote anecdotes
    if (newVoteState[selected] > newVoteState[maxVoteAnecdotes]) {
      setMaxVoteAnecdotes(selected);
    }
    changeVoteState(newVoteState);
  };
  return (
    <>
      <h1>Anecdotes of the day</h1>
      <h3>{anecdotes[selected]}</h3>
      <h3>has {voteState[selected]} votes</h3>
      <Button text="vote" handleClick={handleVoteClick} />
      <Button text="next anecdotes" handleClick={randumAnecdotesGenerator} />
      <h1>Anecdotes with most votes</h1>
      <h3>{anecdotes[maxVoteAnecdotes]}</h3>
      <h3>has {voteState[maxVoteAnecdotes]} votes</h3>
    </>
  );
};

export default App;
