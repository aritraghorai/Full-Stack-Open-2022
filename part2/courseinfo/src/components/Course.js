import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  // debugger;
  const totalNumber = course.parts.reduce(
    (acc, part) => acc + part.exercises,
    0
  );
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={totalNumber} />
    </>
  );
};

export default Course;
