import CoursePart from "../Utils/interfaces/course.interface";

interface propType {
  course: CoursePart;
}

export default function Course({ course }: propType) {
  return (
    <p>
      <h2>{course.name}</h2>
    </p>
  );
}
