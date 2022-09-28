import React from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = Number((good - bad) / total).toFixed(2);
  const percentage = Number((good / total) * 100).toFixed(2);
  if (total === 0) {
    return <h3>No feedback given</h3>;
  }
  return (
    <>
      <h1>statistics</h1>
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="percentage" value={percentage + "%"} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Statistics;
