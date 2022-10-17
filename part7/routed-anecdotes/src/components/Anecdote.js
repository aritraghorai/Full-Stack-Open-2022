import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();

  const anecdote = anecdotes.filter((a) => a.id === Number(id));

  return <div>{anecdote[0].content}</div>;
};
export default Anecdote;
