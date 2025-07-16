import type { CoursePart } from "./types";
import CourseHeader from "./components/Header.component";
import Content from "./components/Content.component";
import Total from "./components/Total.component";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <>
        <CourseHeader name={courseName}/>
        {courseParts.map(course => {
            return <Content name={course.name} exerciseCount={course.exerciseCount} />
        })}
        <Total total={totalExercises}/>
    </>
  );
};

export default App;