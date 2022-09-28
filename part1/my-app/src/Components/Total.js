const Total = ({ parts }) => {
  const total = parts.reduce((total, num) => total + num.exercises, 0);
  return <p>Number of exercises {total}</p>;
};
export default Total;
