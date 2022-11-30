import CoursePart from "../Utils/interfaces/course.interface";

interface propType {
  courses: CoursePart[];
}

export default function Total({ courses }: propType) {
  const total = courses.reduce((total, course) => {
    return total + course.exerciseCount;
  }, 0);

  return <p>Number of exercises {total}</p>;
}
