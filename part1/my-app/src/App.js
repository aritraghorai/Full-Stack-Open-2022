const Header = ({ course }) => {
  return <h1>{course}</h1>;
};
const Part = ({ partName, exerciseNumber }) => (
  <p>
    {partName} {exerciseNumber}
  </p>
);
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part key={i} partName={part.name} exerciseNumber={part.exercises} />
      ))}
    </>
  );
};
const Total = ({ parts }) => {
  const total = parts.reduce((total, num) => total + num.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
