import { useState } from "react";
import Buttom from "./Component/Buttom";
import Header from "./Component/Header";
import Statistics from "./Component/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <>
      <Header />
      <Buttom text="good" setVal={setGood} val={good} />
      <Buttom text="neutral" setVal={setNeutral} val={neutral} />
      <Buttom text="bad" setVal={setBad} val={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} val={bad} />
    </>
  );
};

export default App;
