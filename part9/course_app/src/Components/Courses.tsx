import CoursePart from "../Utils/interfaces/course.interface";

interface propType {
  courses: CoursePart[];
}
export default function Courses({ courses }: propType) {
  return (
    <>
      {courses.map((course) => {
        switch (course.type) {
          case "normal":
            return (
              <>
                <h3>
                  {course.name} {course.exerciseCount}
                </h3>
                <p>{course.description}</p>
              </>
            );
          case "groupProject":
            return (
              <>
                <h3>
                  {course.name} {course.exerciseCount}
                </h3>
                <p>Project Exercise {course.groupProjectCount}</p>
              </>
            );
          case "submission":
            return (
              <>
                <h3>
                  {course.name} {course.exerciseCount}
                </h3>
                <p> {course.description}</p>
                <p>{course.exerciseSubmissionLink}</p>
              </>
            );
          case "special":
            return (
              <>
                <h3>
                  {course.name} {course.exerciseCount}
                </h3>
                <p>{course.description}</p>
                <p>
                  Required Skills: {course.requirements.map((re) => re + " ")}
                </p>
              </>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}
