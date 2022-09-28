import Part from "./Part";
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part key={i} partName={part.name} exerciseNumber={part.exercises} />
      ))}
    </>
  );
};
export default Content;
