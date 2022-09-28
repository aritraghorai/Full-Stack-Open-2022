import { useState } from "react";
import Buttom from "./Component/Buttom";
import Header from "./Component/Header";
import Result from "./Component/Result";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div
      className="App"
      style={{
        textAlign: "center",
      }}
    >
      <Header />
      <Buttom text="good" setVal={setGood} val={good} />
      <Buttom text="neutral" setVal={setNeutral} val={neutral} />
      <Buttom text="bad" setVal={setBad} val={bad} />
      <Result good={good} neutral={neutral} bad={bad} val={bad} />
    </div>
  );
};

export default App;
